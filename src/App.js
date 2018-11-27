import React, { Component } from 'react'
import './App.css'
import io from 'socket.io-client'

class App extends Component {
  constructor (props) {
    super(props)
    this.connectToServer = this.connectToServer.bind
  }
  connectToServer () {
    var socket = io()
    var IO = {
      init: function () {
        IO.socket = io()
        IO.bindevents()
      },
      bindEvents: function () {
        IO.socket.on('Connected', IO.onConnected)
        IO.socket.on('newGame', IO.onNewGame)
        IO.socket.on('hostRoomFull', IO.onHostRoomFull)
        IO.socket.on('newRound', IO.onNewRound)
      },
      onConnected: function () {
        console.log('Got connected msg from server ', IO.socket.socket.sessionId)
      }
    }
    IO.init()
  }
  render () {
    return (
      <div className='App'>
        <h2>Wait what?</h2>
        <button onClick={() => this.connectToServer}>Connect</button>
      </div>
    )
  }
}

export default App
