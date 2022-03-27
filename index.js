const {Server} = require('socket.io')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.static(__dirname + '/public'))

const server = app.listen(PORT,console.log(`Server is runing at ${PORT}`))

const io = new Server(server) 

app.get('/home',(req,res) => {
   res.send('ok')
})

io.on('connection',socket => {
   socket.on('userName', data=> {
      socket.broadcast.emit('Joined',data)
   })
   socket.on('message',data => {
      socket.broadcast.emit('message',data)
   })
})
