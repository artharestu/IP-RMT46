const express = require("express");
const Controller = require("../controllers");
const router = express.Router();

router.get('/', Controller.home);

router.post('/register', Controller.register);
router.post('/login', Controller.login);


module.exports = router;