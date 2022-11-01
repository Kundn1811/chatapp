const express = require('express')
const {registration, login} = require("../controller/user.controller")
const router = express.Router();

router.route('/signup').post(registration)
router.post('/login',login)

module.exports = router;
