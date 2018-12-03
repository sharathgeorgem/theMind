import React, { Component } from 'react'
import './App.css'
import openSocket from 'socket.io-client'

class App extends Component {
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
    this.socket.on('Connected', () => this.socket.emit('reply'))
  }
  render () {
    return (
      <div className='App'>
        <h2>Wait what?</h2>
      </div>
    )
  }
}

export default App
