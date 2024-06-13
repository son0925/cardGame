const socket = io('http://localhost:4000');

// 방에 접속을 했을 때 URL



socket.on('connection', ({ msg }) => {
  alert(JSON.stringify(msg))
})