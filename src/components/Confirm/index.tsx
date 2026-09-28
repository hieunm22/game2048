import { useEffect, useState } from "react"
import { NEW_GAME_CONFIRMATION } from "common/constants"
import Dialog, { DialogButton } from "components/Dialog"
import { registerConfirmHandler } from "./common"
import type { ConfirmProviderProps, ConfirmRequest } from "./types"

const ConfirmProvider = ({ children }: ConfirmProviderProps) => {
	const [current, setCurrent] = useState<ConfirmRequest | null>(null)

	useEffect(() => {
		registerConfirmHandler(
			options => new Promise<boolean>(resolve => setCurrent({ options, resolve }))
		)
		return () => registerConfirmHandler(null)
	}, [])

	const answer = (confirmed: boolean) => {
		current?.resolve(confirmed)
		setCurrent(null)
	}
	const onOk = () => answer(true)
	const onCancel = () => answer(false)

	const description = current?.options.description ?? NEW_GAME_CONFIRMATION
	const body = (
		<>
			<i className="fas fa-question-circle" /> {description}
		</>
	)
	const footer = (
		<>
			<DialogButton label="Ok" onClick={onOk} />
			<DialogButton label="Cancel" onClick={onCancel} />
		</>
	)

	return (
		<>
			{children}
			<Dialog
				isOpen={current !== null}
				closable
				onClose={onCancel}
				variant="text"
				body={body}
				footer={footer}
			/>
		</>
	)
}

export default ConfirmProvider
