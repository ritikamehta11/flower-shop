const express = require('express');
const { register, login } = require('../controllers/authControllers');

const router = express.Router();

//register user
router.post('/register', register);
router.post('/login', login);

module.exports = router;