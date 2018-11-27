const express = require('express')
const path = require('path')
const theMind = require('./theMind')

const app = express()
const server = app.listen(process.env.PORT || 8080, () => {
  console.log('Server running')
})

var io = require('socket.io')(server)

app.use(express.static(path.join(__dirname, 'public')))

// app.get('/', function (req, res) {
//   res.send('Hello world')
//   res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })

io.on('connection', function (socket) {
  console.log('Client connected')
  socket.emit('Connected', { message: 'Oh hi Mark' })
  theMind.startGame(io, socket)
})
