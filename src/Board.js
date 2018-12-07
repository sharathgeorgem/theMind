import React, {Component} from 'react'
import './Board.css'

class Board extends Component {
  constructor (props) {
    super(props)
    this.state = {
      playerType: '',
      cards: [
        16,
        89
      ]
    }
  }
  componentDidMount () {
    (this.props.info.player.type === 'X')
      ? this.setState({playerType: 'X'})
      : this.setState({playerType: 'O'})
  }
  render () {
    return (
      <div>
        <h1>The MIND</h1>
        <div className='table'>
          <div className='deck'>
            <h4>{this.props.info.name}</h4>
            <div className='dragList'>
              <div className='card' onMouseMove={this.props.mouse}>
                {this.state.playerType === 'X'
                  ? <h5>{this.state.cards[0]}</h5>
                  : <h5>{this.state.cards[1]}</h5>}
              </div>
            </div>
            <div className='dropList'>
              <div className='drop'>
                <h5>DROP</h5>
              </div>
            </div>
          </div>
          <div className='deck'>
            <h4>Homie</h4>
            <div className='dragList'>
              <div className='card'>
                <h5>(0\/0)</h5>
              </div>
            </div>
            <div className='dropList'>
              <div className='drop'>
                <h5>DROP</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Board
