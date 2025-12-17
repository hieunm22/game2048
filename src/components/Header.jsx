import React from "react"
import { useSelector } from "react-redux"

const Header = () => {
	const state = useSelector(st => st.home)
	const { score, scoreAddition, best } = state
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

export default Header
