import React from 'react'

function Board (props) {
  return (
    <div onMouseMove={props.mouse}>
      <h1>The Board components to be rendered</h1>
    </div>
  )
}

export default Board
