const express = require('express');
const { registerUser, loginUser, profileController, logoutController } = require('../controller/user');

let userRoutes = express.Router();

userRoutes.post('/register', registerUser)
userRoutes.post('/login', loginUser)
userRoutes.get('/profile', profileController)
userRoutes.get('/logout', logoutController)

module.exports = {userRoutes}