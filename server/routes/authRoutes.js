const express = require('express');
const { register, login, getUsers } = require('../controllers/authControllers');

const router = express.Router();

//register user
router.post('/register', register);
router.post('/login', login);
router.get('/users',getUsers)

module.exports = router;