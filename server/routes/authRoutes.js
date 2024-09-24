const express = require('express');
const { register } = require('../controllers/authControllers');

const router = express.Router();

//register user
router.post('/register', register);

module.exports = router;