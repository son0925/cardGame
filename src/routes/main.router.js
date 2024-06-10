const express = require('express');
const { getMainView, getLoginView, loginUser, logoutUser } = require('../controllers/main.controller');
const mainRouter = express.Router();


mainRouter.get('/login', getLoginView)
mainRouter.post('/login/user', loginUser)
mainRouter.get('/', getMainView)
mainRouter.get('/logout', logoutUser)





module.exports = mainRouter;