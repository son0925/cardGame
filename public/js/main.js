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