const express = require('express');
const app = express();
const http = require('http')
const server = http.createServer(app);
const Server = require('socket.io').Server;
const io = new Server(server,{
  cors: {
    origin: 'http://localhost:4000',
    methods: ['get', 'post']
  }
});
const path = require('path');
const mainRouter = require('./routes/main.router');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const mongoose = require('mongoose');
const joinRouter = require('./routes/join.router');
require('dotenv').config();



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));


mongoose.connect(process.env.MONGO_URI)
  .then(() => {console.log('Mongo DB Connected')})
  .catch((err) => {console.log(err)})



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(cookieSession({
  secret: 'key',
  httpOnly: true
}))
app.use(express.static(path.join(__dirname, '../public')));


// socket 미들웨어를 만들어서 유저 이름 받아오기
// socket에 상대방 유저 접속시 이벤트 만들기
// 이벤트
// 1. 상대 이름, 돈 정보 보내기
// 2. 게임 시작 버튼 활성, 비활성
// 3. 게임 알고리즘 구현하기
// 4. 나갔을 때 이벤트 만들기
io.on('connection', (socket) => {
  console.log('유저 접속');

  socket.emit('connection', ({
    msg: '환영합니다 흑우님'
  }))

  socket.on('joinRoom', ({ roomname, username}) => {
    console.log(roomname + " " + username)
    socket.join(roomname);
    console.log(`${roomname}방에 ${username}님이 들어왔습니다`);

    io.to(roomname).emit('message', {
      user: '시스템',
      text: `${username}님이 방에 들어왔습니다`
    })

    io.to(roomname).emit('roomData', {
      room: roomname,
      // user: getUsersInRoom()
    })
  })


  socket.on('disconnect', () => {
    console.log('유저가 나갔습니다')
  })
})




// 서버 라우터
app.use('/joinRoom', joinRouter);
app.use('/', mainRouter);









const port = 4000;
server.listen(port, () => {
  console.log(`Server Listenning on port ${port}`)
})