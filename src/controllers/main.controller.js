const User = require("../models/users.model")
const roomList = ['test1', 'test2'];

const getMainView = async (req,res) => {
  const userId = req.cookies.userId;
  res.cookie('msg', 'hello');
  if (!userId) {
    return res.redirect('/login');
  }
  const exUser = await User.findById(userId);
  res.render('index',{
    username: exUser.username,
    money: exUser.money,
    roomList: roomList || ['관리자 방']
  })
}


const getLoginView = (req,res) => {
  res.render('login')
}


const loginUser = async (req,res) => {
  const {username} = req.body;
  const exUser = await User.findOne({username});
  // 유저가 이미 있다면 정보 가지고 오기
  if (exUser) {
    res.cookie('userId', exUser.id);
    return res.redirect('/');
  }
  // 존재하지 않는다면
  else {
    const newUser = new User({username});
    try {
      await newUser.save();
      res.cookie('userId', newUser.id);
      res.redirect('/')
    } catch (error) {
      res.status(500).json({err: error})
    }
  }
}

const logoutUser = (req,res) => {
  res.cookie('userId', '');
  res.redirect('/login')
}





module.exports = {
  getMainView,
  getLoginView,
  loginUser,
  logoutUser
}