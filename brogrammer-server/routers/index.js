const express = require("express");
const Controller = require("../controllers");
const authentication = require("../middlewares/authentication");

const router = express.Router();

router.get('/', Controller.home);

router.post('/register', Controller.register);
router.post('/login', Controller.login);

router.use(authentication);
router.get('/courses', Controller.getCourses)
router.get('/course/:id', Controller.getDetailCourse)
router.get('/categories', Controller.getCategories)

router.post('/chat', Controller.chatAI);

router.get('/payment/verify', Controller.verifyPayment);

router.get('/subscription/:CourseId', Controller.addSubscriber);
router.get('/subscriber/:CourseId', Controller.getSubscriber);

module.exports = router;