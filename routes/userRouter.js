const express = require('express');
const router = express.Router();
const { userregister, loginuser } = require('../controllers/authcontroller');

router.post('/register', userregister);
router.post('/login', loginuser);

module.exports = router;
