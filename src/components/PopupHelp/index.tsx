import { HOW_TO_PLAY } from "common/constants"
import Dialog, { DialogButton } from "components/Dialog"
import { useAppDispatch, useAppSelector } from "store"
import { closePopup } from "store/slices/home"

const PopupHelp = () => {
	const isOpen = useAppSelector(st => st.home.gameStatus === 3)
	const dispatch = useAppDispatch()
	const onClose = () => dispatch(closePopup())

	const footer = <DialogButton label="Close" muted onClick={onClose} />

	return (
		<Dialog
			isOpen={isOpen}
			closable
			onClose={onClose}
			variant="text"
			body={HOW_TO_PLAY}
			footer={footer}
		/>
	)
}

export default PopupHelp
