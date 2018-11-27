var io

exports.startGame = function (socketIo, socket) {
  io = socketIo
  socket.emit('Connected', { message: 'Oh hi Mark' })

  // Server(spectator)
  socket.on('newGame', newGame)
  socket.on('hostRoomFull', loadGame)
  socket.on('countDownFinished', startGame)
  socket.on('nextRound', startNextRound)

  // Player events
  // socket.on('newPlayer', newPlayer)
  // socket.on('restart', restart)
}

function newGame () {
  var newGameId = parseInt(Math.random() * 100000)
  // Return roomID and socketID to player.
  this.emit('newGame', {gameID: newGameId, mySocketId: this.id})
  this.join(newGameId.toString())
}

function loadGame (gameID) {
  var thisSocket = this
  var data = {
    mySocketId: thisSocket.id,
    gameID: gameID
  }
  console.log('All players online. Let\'s do this')
  io.sockets.in(data.gameID).emit('beginNewGame', data)
}

function startGame (gameID) {
  console.log('Let the game begin')
  sendCards(0, gameID)
}

function startNextRound (data) {
  if (data.round < 12) {
    sendCards(data.round, data.gameID)
  } else {
    io.sockets.in(data.gameID).emit('You died', data)
  }
}

function sendCards (index, gameID) {
  var data = 'Hello this is your message'
  io.sockets.in(data.gameID).emit('newMessage', data)
}

// function newPlayer (data) {
//   console.log('Player ' + data.playerName + 'attempting to join game: ' + data.gameID)
//   var socket = this

//   var room = socket.manager.rooms['/' + data.gameID]

//   if (room !== undefined) {
//     // Attach socketID to game object.
//     data.mySocketId = socket.id
//     // Join the room
//     socket.join(data.gameID)
//     console.log('Player ' + data.playerName + ' joining game: ' + data.gameID)

//     io.sockets.in(data.gameID).emit('playerJoinedRoom', data)
//   } else {
//     this.emit('error', {message: 'This room does not exist'})
//   }
// }

// function restart (data) {
//   console.log('Player: ' + data.playerName + ' ready for new game.')

//   data.playerId = this.id
//   io.sockets.in(data.gameID).emit('playerJoinedRoom', data)
// }
