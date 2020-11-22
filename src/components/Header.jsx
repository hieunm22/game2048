import React from 'react'
import { connect } from "redux-zero/react"

const Header = ({ score, scoreAddition, best }) => {
  return (
    <div className="heading flex">
      <h1 className="title">2048</h1>
      <div className="scores-container flex">
        <div className="score-container">
          <span className="score-title">SCORE</span>
          <br />
          <span className="score-value">{score || 0}</span>
          {scoreAddition > 0 && <div className="score-addition">+{scoreAddition}</div>}
        </div>
        <div className="best-container">
          <span className="score-title">BEST</span>
          <br />
          <span className="score-value">{best || 0}</span>
        </div>
      </div>
    </div>
  )
}

const mapToProps = ({ 
  score,
  scoreAddition,
  best
}) => ({ 
  score,
  scoreAddition,
  best
})

const connected = connect(mapToProps, null)

export default connected(Header)
