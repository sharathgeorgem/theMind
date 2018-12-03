const express = require('express')
const path = require('path')
// const theMind = require('./theMind')

const app = express()
const server = app.listen(8080, () => {
  console.log('Server running')
})

const io = require('socket.io')(server)

let rooms = 0

app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', function (socket) {
  console.log('Client connected')

  socket.emit('Connected', { message: 'Oh hi Mark' })
  // theMind.startGame(io, socket)

  socket.on('reply', () => {
    console.log('Reply received')
  })

  socket.on('disconnect', () =>
    console.log('disconnected'))

  socket.on('createGame', function (data) {
    socket.join('room-' + ++rooms)
    socket.emit('newGame', { name: data.name, room: 'room-' + rooms })
  })

  socket.on('joinGame', function (data) {
    var room = io.nsps['/'].adapter.rooms[data.room]
    if (room && room.length === 1) {
      socket.join(data.room)
      socket.broadcast.to(data.room).emit('player1', {})
      socket.emit('player2', { name: data.name, room: data.room })
    } else {
      socket.emit('err', {message: 'Sorry, The room is full!'})
    }
  })

  socket.on('playTurn', function (data) {
    socket.broadcast.to(data.room).emit('turnPlayed', {
      tile: data.tile,
      room: data.room
    })
  })

  socket.on('gameEnded', function (data) {
    socket.broadcast.to(data.room).emit('gameEnd', data)
  })
})
