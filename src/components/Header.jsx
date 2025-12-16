import React from "react"
import { connect } from "redux-zero/react"

const Header = ({ score, scoreAddition, best }) => {
	const sep = new Intl.NumberFormat().formatToParts(1000)[1].value
	const regExp = /\B(?=(\d{3})+(?!\d))/g
	const scoreStr = (score || 0).toString().replace(regExp, sep)
	const bestStr = (best || 0).toString().replace(regExp, sep)
	return (
		<div className="heading flex">
			<h1 className="title">2048</h1>
			<div className="scores-container flex">
				<div className="score-container">
					<div className="score-title">SCORE</div>
					<div className="score-value">{scoreStr}</div>
					{scoreAddition > 0 && <div className="score-addition">+{scoreAddition}</div>}
				</div>
				<div className="best-container">
					<div className="score-title">BEST</div>
					<div className="score-value">{bestStr}</div>
				</div>
			</div>
		</div>
	)
}

const mapToProps = ({ score, scoreAddition, best }) => ({
	score,
	scoreAddition,
	best
})

const connected = connect(mapToProps, null)

export default connected(Header)
