import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
// import Board from './chess/Board'
// import observe from './chess/game'

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

// const chess = document.getElementById('chess')

// observe(knightPosition =>
//   ReactDOM.render(
//     <Board knightPosition={knightPosition} />,
//     chess
//   )
// )
