const User = require("../models/users.model")
const roomList = [];

// 메인 페이지
const getMainView = async (req,res) => {
  const userId = req.cookies.userId;
  if (!userId) {
    return res.redirect('/login');
  }
  const exUser = await User.findById(userId);
  res.render('index',{
    username: exUser.username,
    money: exUser.money,
    roomList: roomList
  })
}

// 로그인 페이지
const getLoginView = (req,res) => {
  res.render('login')
}

// 방 만들기 페이지
const getCreateRoomView = (req,res) => {
  res.render('createRoom');
}


const loginUser = async (req,res) => {
  const {username} = req.body;
  const exUser = await User.findOne({username});
  // 유저가 이미 있다면 정보 가지고 오기
  if (exUser) {
    res.cookie('userId', exUser.id);
    res.cookie('msg', `${username}님 환영합니다`, { httpOnly: false })
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

// 로그아웃
const logoutUser = (req,res) => {
  res.cookie('userId', '');
  res.redirect('/login')
}

// 방을 만들 때 해당 방이 이미 서버에 있는 지
const incloudsRoomList = (roomname) => {
  for (let i = 0; i < roomList.length; i++) {
    if (roomList[i].roomname === roomname) {
      return true;
    }
  }
  return false;
}

// 방 만들기 버튼 클릭
const postCreateRoom = (req,res) => {
  const { roomname, option } = req.body;
  if (incloudsRoomList(roomname)) {
    return res.cookie('msg', '해당 방 이름은 이미 존재합니다', { httpOnly: false }).redirect('/')
  }
  const room = { roomname, option };
  roomList.push(room);
  res.redirect('/')
}






module.exports = {
  getMainView,
  getLoginView,
  loginUser,
  logoutUser,
  getCreateRoomView,
  postCreateRoom
}