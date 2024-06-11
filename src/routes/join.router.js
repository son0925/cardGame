const express = require('express');
const { getGameView } = require('../controllers/join.controller');
const joinRouter = express.Router();



joinRouter.get('/:roomname', getGameView)





module.exports = joinRouter;