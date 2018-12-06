import React from 'react'
import Knight from './Knight'
import Square from './Square'
import { canMoveKnight, moveKnight } from './game'
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

function renderSquare (i, [knightX, knightY]) {
  const x = i % 8
  const y = Math.floor(i / 8)
  const isKnightHere = (x === knightX && y === knightY)
  const black = (x + y) % 2 === 1
  const piece = isKnightHere ? <Knight /> : null

  return (
    <div onClick={() => handleSquareCLick(x, y)}>
      <div key={i} style={{ width: '50px', height: '50px' }}>
        <Square black={black}>
          {piece}
        </Square>
      </div>
    </div>
  )
}

function handleSquareCLick (toX, toY) {
  if (canMoveKnight(toX, toY)) {
    moveKnight(toX, toY)
  }
}

export default function Board ({knightPosition}) {
  const squares = []
  for (let i = 0; i < 64; i++) {
    squares.push(renderSquare(i, knightPosition))
  }
  return (
    <DragDropContextProvider backend={HTML5Backend}>
      <div style={{
        width: '400px',
        height: '400px',
        display: 'flex',
        flexWrap: 'wrap'
      }}>
        {squares}
      </div>
    </DragDropContextProvider>
  )
}
