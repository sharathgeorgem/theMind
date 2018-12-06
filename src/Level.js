import React from 'react'
import {Link} from 'react-router-dom'
import './Level.css'

function Level (props) {
  console.log('The props are ', props.info)
  console.log('The name is ', props.info.name)
  return (
    <div>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <h1>Hello, {props.info.name}</h1>
            <h1 className='text-center'>Start Level</h1>
            <ul>
              <li className='col-md-6'>
                <Link style={{ textDecoration: 'none', color: 'inherit' }}
                  to={{
                    pathname: '/level1'
                  }}>
                  <div className='front'>1</div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Level
