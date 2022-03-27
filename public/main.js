const socket = io()


const userName = prompt("Ismingizni kiriting: ")

socket.emit('userName' , userName)
const p = document.createElement('P')
   p.textContent = `You Joined`
   p.className="joined-msg"
   chatBox.appendChild(p)

const form = document.getElementById('form')

form.addEventListener('submit', e=> {
   e.preventDefault()
   const msg = input.value
   const msgData = {
      message:msg,
      userName:userName
   }
   console.log(input.value);
   socket.emit('message',msgData)
   const divMsg = document.createElement('div'),
          nameTxt = document.createElement('p'),
          msgTxt = document.createElement('p')
         
   divMsg.className = "msg"
   nameTxt.className = 'userName'
   msgTxt.className = 'userMsg' 
   nameTxt.textContent = `You`
   msgTxt.textContent = `${msgData.message}`
   
   divMsg.appendChild(nameTxt)
   divMsg.appendChild(msgTxt)
   chatBox.appendChild(divMsg)
   input.value = ""
})


socket.on('Joined',data=> {
   const p = document.createElement('P')
   p.textContent = `${data ? data : 'unknow user'} Joined`
   p.className="joined-msg"
   chatBox.appendChild(p)
})

socket.on('message',data=>{
   const divMsg = document.createElement('div'),
          nameTxt = document.createElement('p'),
          msgTxt = document.createElement('p')
   divMsg.className = "msg"
   nameTxt.className = "userName"
   msgTxt.className = "userMsg"
   
   nameTxt.textContent = `${data.userName}`
   msgTxt.textContent = `${data.message}`
   
   divMsg.appendChild(nameTxt)
   divMsg.appendChild(msgTxt)
   chatBox.appendChild(divMsg)
   console.log(data);
})