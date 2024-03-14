const midtransClient = require('midtrans-client');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { Course, Subscriber } = require('../models')

const initPayment = async (price, email) => {
  try {
    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
      clientKey: process.env.MIDTRANS_CLIENT_KEY
    });
    const orderId = uuidv4();

    const parameter = {
      "transaction_details": {
        "order_id": orderId,
        "gross_amount": price
      },
      "credit_card": {
        "secure": true
      },
      "customer_details": {
        "email": email
      }
    };

    const transaction = await snap.createTransaction(parameter)

    return {
      tokenPayment: transaction.token,
      orderId: orderId
    }
  } catch (error) {
    next(error)
  }
}

const verifyPayment = async (req, res, next) => {
  try {
    const orderId = 'f8f63c71-e058-4686-8006-183b59acd99e'
    const serverKey = process.env.MIDTRANS_SERVER_KEY
    const keyBase64 = Buffer.from(serverKey, 'ascii').toString('base64')

    const response = await axios({
      method: 'get',
      url: `https://api.sandbox.midtrans.com/v2/${orderId}/status`,
      headers: {
        accept: 'application/json',
        authorization: `Basic ${keyBase64}`
      }
    })

    res.status(200).json({
      status: response.data.status_code,
      message: response.data.status_message
    })
  } catch (error) {
    next(error)
  }
}

const addSubscriber = async (req, res, next) => {
  const UserId = req.user.id
  const email = req.user.email

  const { CourseId } = req.params
  try {
    const course = await Course.findByPk(CourseId)
    if (!course) throw { name: 'NotFound' }

    const { orderId, tokenPayment } = await initPayment(course.price, email)

    const subscriber = await Subscriber.create({
      UserId,
      CourseId,
      orderId,
      tokenPayment
    })

    res.status(201).json(subscriber)
  } catch (error) {
    next(error)
  }
}

const getSubscriber = async (req, res, next) => {
  const UserId = req.user.id
  const { CourseId } = req.params

  try {
    const subscriber = await Subscriber.findOne({
      where: {
        UserId,
        CourseId
      },
      attributes: ['id', 'UserId', 'CourseId', 'orderId', 'tokenPayment', 'status']
    })
    if (!subscriber) throw { name: 'NotFound' }

    res.status(200).json(subscriber)
  } catch (error) {
    console.log(error)
    next(error)
  }
}
module.exports = {
  verifyPayment,
  addSubscriber,
  getSubscriber
};