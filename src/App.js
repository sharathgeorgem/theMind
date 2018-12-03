import React, { Component } from 'react'
import './App.css'
import openSocket from 'socket.io-client'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      roomToJoin: '',
      player: {
        name: '',
        type: '',
        currentTurn: true
      },
      game: {
        roomId: '',
        board: ''
      },
      playerOne: 'X',
      playerTwo: 'O'
    }
    this.createGame = this.createGame.bind(this)
    this.joinGame = this.joinGame.bind(this)
    this.handleNewPlayer = this.handleNewPlayer.bind(this)
    this.handleJoinRoom = this.handleJoinRoom.bind(this)
  }
  componentDidMount () {
    this.socket = openSocket.connect('http://localhost:8080')
    this.socket.on('Connected', (data) => {
      console.log('data is ' + JSON.stringify(data))
      this.socket.emit('reply')
    })
    this.socket.on('newGame', (data) => {
      console.log('Player1 is ', data.name)
      console.log('Room id is ', data.room)
      let message = 'Hello, ' + data.name + '. Please ask your friend to enter Game ID: ' + data.room + '. Waiting for player 2...'
      console.log('The message is ', message)
      this.setState({game: {roomId: data.room}})
      // this.game.displayBoard(message)
    })
    this.socket.on('player1', data => {
      let message = 'Hello, ' + this.state.name
      console.log(message)
    })
    this.socket.on('player2', data => {
      let message = 'Hello, ' + this.state.name
      console.log(message)
    })
  }
  handleNewPlayer (event) {
    this.setState({name: event.target.value})
  }
  handleJoinRoom (event) {
    this.setState({roomToJoin: event.target.value})
    console.log('Setting room to join', this.state.roomToJoin)
  }
  createGame () {
    console.log('In createGame client')
    this.socket.emit('createGame', {name: this.state.name})
    this.setState({player: {name: this.state.name}})
    this.setState({player: {type: this.state.playerOne}})
  }
  joinGame () {
    console.log('In joinGame client', this.state.name, this.state.roomToJoin)
    this.socket.emit('joinGame', {name: this.state.name, room: this.state.roomToJoin})
    this.setState({player: {name: this.state.name}})
    this.setState({player: {type: this.state.playerTwo}})
  }
  render () {
    return (
      <div className='App'>
        <div className='menu'>
          <h1>The Mind</h1>
          <h3>How To Play</h3>
          <ol>
            <li>Player 1: Create a new game by entering the username</li>
            <li>Player 2: Enter another username and the room id that is displayed on first window.</li>
            <li>Click on join game. </li>
          </ol>
          <h4>Create a new Game</h4>
          <input type='text' onChange={this.handleNewPlayer} placeholder='Enter your name' />
          <button id='new' onClick={this.createGame}>New Game</button>
          <br />
          <h4>Join an existing game</h4>
          <input type='text' onChange={this.handleNewPlayer} placeholder='Enter your name' />
          <input type='text' onChange={this.handleJoinRoom} placeholder='Enter Game ID' />
          <button id='join' onClick={this.joinGame}>Join Game</button>
        </div>
      </div>
    )
  }
}

export default App

// var IO = {
//   init: function () {
//     IO.socket = io()
//     IO.bindEvents()
//   },
//   bindEvents: function () {
//     IO.socket.on('Connected', IO.onConnected)
//     IO.socket.on('newGame', IO.onNewGame)
//     IO.socket.on('hostRoomFull', IO.onHostRoomFull)
//     IO.socket.on('newRound', IO.onNewRound)
//   },
//   onConnected: function () {
//     console.log('Got connected msg from server ', IO.socket.sessionId)
//   }
// }
// IO.init()
