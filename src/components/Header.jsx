import React from 'react'
import { connect } from "redux-zero/react"

const Header = ({ score, best }) => {
  return (
    <div className="heading flex">
      <h1 className="title">2048</h1>
      <div className="scores-container flex">
        <div className="score-container">
          <span className="score-title">SCORE</span>
          <br />
          <span className="score-value">{score || 0}</span>
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
  best
}) => ({ 
  score,
  best
})

const connected = connect(mapToProps, null)

export default connected(Header)
