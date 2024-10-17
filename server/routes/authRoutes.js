const express = require('express');
const { register, login, getUsers, deleteUsers } = require('../controllers/authControllers');

const router = express.Router();

//register user
router.post('/register', register);
router.post('/login', login);
router.get('/users', getUsers);
router.delete('/delete/:id', deleteUsers);

module.exports = router;