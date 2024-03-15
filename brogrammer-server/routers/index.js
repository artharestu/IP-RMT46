const express = require("express");
const Controller = require("../controllers");
const authentication = require("../middlewares/authentication");
const upload = require("../middlewares/multer");

const router = express.Router();

router.get('/', Controller.home);

router.post('/register', Controller.register);
router.post('/login', Controller.login);

router.use(authentication);
router.get('/courses', Controller.getCourses)
router.get('/course/:id', Controller.getDetailCourse)
router.get('/categories', Controller.getCategories)

router.post('/chat', Controller.chatAI);

router.patch('/verify/:orderId', Controller.verifyPayment);

router.get('/subscription/:CourseId', Controller.addSubscriber);
router.get('/subscriber/:CourseId', Controller.getSubscriber);
router.delete('/subscriber/:CourseId', Controller.deleteSubscriber);

router.get('/video/:videoId', Controller.getVideo);

router.get('/profile/:id', Controller.getProfile);
router.put('/profile/:id', Controller.updateProfile);
router.patch('/profile/:id', upload.single('profilePicture'), Controller.updateProfilePicture);

router.get('/mycourses', Controller.getMyCourses);

module.exports = router;