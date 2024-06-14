const socket = io('http://localhost:4000');

// 방에 접속을 했을 때 URL


const roomname = window.location.pathname.split('/').pop();
const username = document.getElementById('myName').innerText;


socket.emit('joinRoom', ({ roomname, username}));

socket.on('message', ({ user, text }) => {
  alert(`${user} : ${text}`);
})


// 방 목록 출력 시키기 만들기
socket.on('roomData', ({ room, user }) => {

})



socket.on('connection', ({ msg }) => {
  alert(JSON.stringify(msg))
})