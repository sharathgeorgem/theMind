import React, { Component } from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import openSocket from 'socket.io-client'
import Level from './Level'
import Board from './Board'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      roomToJoin: '',
      err: '',
      playerReady: false,
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
    this.handleMouseMove = this.handleMouseMove.bind(this)
  }
  componentDidMount () {
    this.socket = openSocket.connect('http://192.168.0.8:8080')
    this.socket.on('Connected', (data) => {
      console.log('data is ' + JSON.stringify(data))
      this.socket.emit('reply')
    })
    this.socket.on('newGame', (data) => {
      console.log('Player1 is ', data.name)
      console.log('Room id is ', data.room)
      let message = 'Hello, ' + data.name + '. Game ID: ' + data.room + '. Waiting for player 2..'
      console.log('The message is ', message)
      this.setState({game: {roomId: data.room}})
      console.log('!!!!!ROOM ID IS NEW GAME!!!!', this.state.game.roomId)
      // this.game.displayBoard(message)
    })
    this.socket.on('player1', data => {
      let message = 'Hello, ' + this.state.name
      this.setState({game: {roomId: data.room}})
      console.log(message)
    })
    this.socket.on('player2', data => {
      let message = 'Hello, ' + this.state.name
      this.setState({game: {roomId: data.room}})
      console.log(message)
    })
    this.socket.on('startGame', () => {
      this.setState({playerReady: true})
    })
    this.socket.on('err', (data) => {
      this.setState({err: data.message})
    })
    this.socket.on('onMouseMove', (data) => {
      console.log('The received movements are ', data.mouseX, data.mouseY)
    })
  }
  handleNewPlayer (event) {
    this.setState({name: event.target.value})
  }
  handleJoinRoom (event) {
    this.setState({roomToJoin: event.target.value})
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
  handleMouseMove (e) {
    this.socket.emit('onMouseMove', {room: this.state.game.roomId, mouseX: e.nativeEvent.clientX, mouseY: e.nativeEvent.clientY})
    // console.log('onMouseMove', e.nativeEvent.clientX, e.nativeEvent.clientY)
  }
  render () {
    let display = (!this.state.playerReady)
      ? (<div className='menu'>
        <h1>The Mind</h1>
        <ol>
          <li>Player 1: Create a new game by entering the username</li>
          <li>Player 2: Enter another username and the room id that is displayed on first window.</li>
          <li>Click on join game. </li>
        </ol>
        <h4>Create a new Game</h4>
        <input className='input' type='text' onChange={this.handleNewPlayer} placeholder='Enter your name' />
        <button id='new' onClick={this.createGame}>New Game</button>
        <br />
        <h4>Join an existing game</h4>
        <input className='input' type='text' onChange={this.handleNewPlayer} placeholder='Enter your name' />
        <input className='input' type='text' onChange={this.handleJoinRoom} placeholder='Enter Game ID' />
        <button id='join' onClick={this.joinGame}>Join Game</button>
      </div>)
      : (this.state.err)
        ? <h2>{this.state.err} {this.state.name}</h2> : (
          <BrowserRouter basename={process.env.PUBLIC_URL}>
            <div>
              <Route exact path='/' render={props => <Level info={this.state} {...props} />} />
              <Route path='/level1' render={props => <Board info={this.state} mouse={this.handleMouseMove} {...props} />} />
            </div>
          </BrowserRouter>)
    return (
      <div className='App'>
        {display}
      </div>
    )
  }
}

export default App
