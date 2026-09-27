import React, { useEffect, useState } from "react"
import { Classes, Overlay2 } from "@blueprintjs/core"
import { NEW_GAME_CONFIRMATION } from "../common/constants"

let handler = null

// Called by consumers: returns a Promise that resolves to true (OK) or false (Cancel)
export function openPopup(options = {}) {
	if (!handler) {
		// If provider not mounted, create a temporary portal dialog
		return new Promise(resolve => {
			resolve(false)
		})
	}
	return handler(options)
}

// Provider-based implementation (recommended)
export const ConfirmProvider = props => {
	const [queue, setQueue] = useState([])

	const options = {
		canEscapeKeyClose: true,
		canOutsideClickClose: true,
		enforceFocus: true,
		hasBackdrop: true,
		isOpen: true,
		usePortal: true
	}

	useEffect(() => {
		// register handler
		handler = options => {
			return new Promise(resolve => {
				const id = Date.now() + Math.random()
				setQueue([{ id, options, resolve }])
			})
		}

		return () => {
			handler = null
		}
	}, [])

	const current = queue[0] ?? null

	const onCancel = () => {
		if (!current) {
			return
		}
		current.resolve(false)
		setQueue([])
	}

	const onOkClicked = () => {
		if (!current) {
			return
		}
		current.resolve(true)
		setQueue([])
	}

	const onKeyDown = e => {
		if (e.code === "Escape") {
			onCancel()
		} else if (e.code === "Enter") {
			onOkClicked()
		}
	}

	return (
		<>
			{props.children}

			{current && (

				<Overlay2 onClose={onCancel} className={Classes.OVERLAY_SCROLL_CONTAINER} {...options}>
					<div className="overlay-dialog">
						<div className="overlay-header" />
						<div className="overlay-body-help">
							<span className="alert-icon">
								<i className="fas fa-question-circle" />
							</span>
							{NEW_GAME_CONFIRMATION}
						</div>
						<div className="overlay-footer flex2">
							<span className="half-link" onKeyDown={onKeyDown} content="Ok" onClick={onOkClicked} />
							<span className="half-link" content="Cancel" onClick={onCancel} />
						</div>
					</div>
				</Overlay2>
			)}
		</>
	)
}

export default ConfirmProvider
