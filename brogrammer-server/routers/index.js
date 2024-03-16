const express = require("express");
const Controller = require("../controllers");
const authentication = require("../middlewares/authentication");
const upload = require("../middlewares/multer");

const router = express.Router();

router.get('/', Controller.home);

router.post('/register', Controller.register);
router.post('/login', Controller.login);
router.post('/google-login', Controller.googleLogin);

router.use(authentication);
router.get('/courses', Controller.getCourses)
router.get('/course/:id', Controller.getDetailCourse)
router.get('/mycourses', Controller.getMyCourses);

router.get('/categories', Controller.getCategories)

router.post('/chat', Controller.chatAI);

router.get('/subscription/:CourseId', Controller.addSubscriber);
router.patch('/verify/:orderId', Controller.verifyPayment);
router.get('/subscriber/:CourseId', Controller.getSubscriber);
router.delete('/subscriber/:CourseId', Controller.deleteSubscriber);

router.get('/profile', Controller.getProfile);
router.put('/profile', Controller.updateProfile);
router.patch('/profile', upload.single('profilePicture'), Controller.updateProfilePicture);
router.get('/video/:id', Controller.getVideo);

module.exports = router;