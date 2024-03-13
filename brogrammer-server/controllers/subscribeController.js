const midtransClient = require('midtrans-client');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const initPayment = async (req, res, next) => {
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
        "gross_amount": 10000
      },
      "credit_card": {
        "secure": true
      },
      "customer_details": {
        "first_name": "Artha",
        "last_name": "Abadi",
        "email": "artharestuabadi@gmail.com",
        "phone": "085643440044"
      }
    };

    const transaction = await snap.createTransaction(parameter)


    res.status(200).json({
      token: transaction.token,
      order_id: orderId
    })
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
module.exports = {
  initPayment,
  verifyPayment
};