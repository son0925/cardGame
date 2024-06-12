const User = require("../models/users.model");

const getGameView = async (req,res) => {
  const userId = req.cookies.userId;
  console.log(userId);
  res.render('twoCard');
}












module.exports = {
  getGameView
}