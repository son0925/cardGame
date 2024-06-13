const User = require("../models/users.model");

const getGameView = async (req,res) => {
  // 쿠키로 유저 id를 가져온다
  const userId = req.cookies.userId;
  // 돈, 유저 이름을 게임 화면으로 보낸다
  if (!userId) {
    res.cookie('msg', '다시 로그인해주세요')
    return res.redirect('/login');
  }

  const exUser = await User.findById(userId);
  if (!exUser) {
    res.cookie('msg', '해당 유저에 대한 정보가 없습니다', { httpOnly: false})
    return res.status(401).redirect('/');
  }

  // 유저가 있다면
  const { username, money } = exUser;
  res.render('twoCard', {
    username,
    money
  });
}












module.exports = {
  getGameView
}