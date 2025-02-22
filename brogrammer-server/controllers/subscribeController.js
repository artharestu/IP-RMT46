const midtransClient = require('midtrans-client');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { Course, Subscriber } = require('../models')

const initPayment = async (price, email) => {
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
}

const verifyPayment = async (req, res, next) => {
  const { orderId } = req.params
  try {
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

    if (response.data.status_code == 200)
      await Subscriber.update({ status: 'subscribed' }, { where: { orderId } })

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
    next(error)
  }
}

const deleteSubscriber = async (req, res, next) => {
  const UserId = req.user.id
  const { CourseId } = req.params
  try {
    const subscriber = await Subscriber.findOne({
      where: {
        UserId,
        CourseId
      }
    })
    if (!subscriber) throw { name: 'NotFound' }
    if (subscriber.status == 'subscribed') throw { name: 'Forbidden' }

    await subscriber.destroy()

    res.status(200).json({ message: 'Subscriber has been deleted' })
  } catch (error) {
    next(error)
  }
}
module.exports = {
  verifyPayment,
  addSubscriber,
  getSubscriber,
  deleteSubscriber
};