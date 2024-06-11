function getMsg() {
  const cookies = document.cookie.split(';')
  for (let i = 0; i < cookies.length; i++) {
    if (cookies[i].includes('msg')) {
      const message = cookies[i].split('=');
      if (message[1].length > 0) {
        document.cookie = 'msg='
        return alert(decodeURIComponent(message[1]))
      }
    }
  }
}

getMsg()

// 소켓
const socket = io('http://localhost:4000', {
  autoConnect: false
})

// 유저가 접속 했을 때 환영 메세지
socket.on('connection', ({msg}) => {
  alert(JSON.stringify(msg))
})