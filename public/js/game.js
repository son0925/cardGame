// 우선 페이지에 들어갔을 때 연결되는지
const socket = io('http://localhost:4000');


socket.on('connection', ({ msg }) => {
  alert(JSON.stringify(msg))
})