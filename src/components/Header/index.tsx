import { useAppSelector } from "store"
import "./Header.scss"

const Header = () => {
	const score = useAppSelector(st => st.home.score)
	const scoreAddition = useAppSelector(st => st.home.scoreAddition)
	const best = useAppSelector(st => st.home.best)
	const sep = new Intl.NumberFormat().formatToParts(1000)[1].value
	const regExp = /\B(?=(\d{3})+(?!\d))/g
	const scoreStr = score.toString().replace(regExp, sep)
	const bestStr = best.toString().replace(regExp, sep)

	return (
		<div className="header">
			<h1 className="header__title">2048</h1>
			<div className="header__scores">
				<div className="header__score">
					<div className="header__score-label">Score</div>
					<div className="header__score-value">{scoreStr}</div>
					{scoreAddition > 0 && (
						// keyed by score to replay the animation on every scoring move
						<div key={score} className="header__score-addition">
							+{scoreAddition}
						</div>
					)}
				</div>
				<div className="header__score">
					<div className="header__score-label">Best</div>
					<div className="header__score-value">{bestStr}</div>
				</div>
			</div>
		</div>
	)
}

export default Header
