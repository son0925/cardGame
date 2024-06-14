const socket = io('http://localhost:4000');

// 방에 접속을 했을 때 URL


const roomname = window.location.pathname.split('/').pop();
const username = "<%= username %>";


socket.emit('joinRoom', ({ roomname, username}))



socket.on('connection', ({ msg }) => {
  alert(JSON.stringify(msg))
})