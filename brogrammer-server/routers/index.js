const express = require("express");
const Controller = require("../controllers");
const router = express.Router();

router.get('/', Controller.home);

router.post('/register', Controller.register);
router.post('/login', Controller.login);

router.get('/courses', Controller.getCourses)

router.post('/chat', Controller.chatAI);

router.get('/payment/init', Controller.initPayment);
router.get('/payment/verify', Controller.verifyPayment);

module.exports = router;