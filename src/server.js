const express = require('express');
const app = express();
const http = require('http')
const server = http.createServer(app);
const Server = require('socket.io').Server;
const io = new Server(server);
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


// 소켓 미들웨어
io.use((socket, next) => {
  const username = socket.handshake.auth.username;

  socket.username = username;
  next();
})


// 유저가 접속했을 때
io.on('connection', (socket) => {
  console.log('유저 접속')
  socket.emit('connection', {msg: 'hello'})
})


// 서버 라우터
app.use('/joinRoom', joinRouter);
app.use('/', mainRouter);









const port = 4000;
server.listen(port, () => {
  console.log(`Server Listenning on port ${port}`)
})