import React, { Component } from 'react'
import './App.css'
import openSocket from 'socket.io-client'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      roomToJoin: ''
    }
    this.createGame = this.createGame.bind(this)
    this.joinGame = this.createGame.bind(this)
    this.handleNewPlayer = this.handleNewPlayer.bind(this)
    this.handleJoinRoom = this.handleJoinRoom.bind(this)
  }
  componentDidMount () {
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
    this.socket = openSocket.connect('http://localhost:8080')
    this.socket.on('Connected', (data) => {
      console.log('data is ' + JSON.stringify(data))
      this.socket.emit('reply')
    })
    this.socket.on('newGame', (data) => {
      console.log('Player1 is ', data.name)
      console.log('Room id is ', data.room)
    })
    this.socket.on('player2', data => {
      console.log('Player2 is ', data.name)
      console.log('Room id is ', data.room)
    })
  }
  handleNewPlayer (event) {
    this.setState({name: event.target.value})
  }
  handleJoinRoom (event) {
    this.setState({roomToJoin: event.target.value})
  }
  createGame () {
    this.socket.emit('createGame', {name: this.state.name})
  }
  joinGame () {
    this.socket.emit('joinGame', {name: this.state.name, room: this.state.roomToJoin})
  }
  render () {
    return (
      <div className='App'>
        <h2>The Mind</h2>
        <label>
          <span>Enter your name</span>
          <input type='text' value={this.state.name} onChange={this.handleNewPlayer} />
        </label>
        <button onClick={this.createGame}>Create Game</button>
        <br />
        <label>
          <span>Enter your name</span>
          <input type='text' value={this.state.name} onChange={this.handleNewPlayer} />
          <span>Enter room name to join</span>
          <input type='text' value={this.state.roomToJoin} onChange={this.handleJoinRoom} />
        </label>
        <button onClick={this.joinGame}>Join Game</button>
        <div className='menu'>
          <h1>The Mind</h1>
          <h3>How To Play</h3>
          <ol>
            <li>Player 1: Create a new game by entering the username</li>
            <li>Player 2: Enter another username and the room id that is displayed on first window.</li>
            <li>Click on join game. </li>
          </ol>
          <h4>Create a new Game</h4>
          <input type='text' name='name' id='nameNew' placeholder='Enter your name' />
          <button id='new'>New Game</button>
          <br />
          <h4>Join an existing game</h4>
          <input type='text' name='name' id='nameJoin' placeholder='Enter your name' />
          <input type='text' name='room' id='room' placeholder='Enter Game ID' />
          <button id='join'>Join Game</button>
        </div>
      </div>
    )
  }
}

export default App
