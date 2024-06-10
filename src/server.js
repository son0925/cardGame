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
}))
app.use(express.static(path.join(__dirname, '../public')));


// 서버 라우터
app.use('/', mainRouter);









const port = 4000;
server.listen(port, () => {
  console.log(`Server Listenning on port ${port}`)
})