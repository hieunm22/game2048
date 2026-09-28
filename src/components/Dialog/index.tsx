import { Classes, Overlay2 } from "@blueprintjs/core"
import classNames from "classnames"
import type { DialogProps } from "./types"
import "./Dialog.scss"

export { DialogButton } from "./components"

const Dialog = ({ isOpen, closable, onClose, variant, body, footer }: DialogProps) => {
	const bodyCls = classNames("dialog__body", { "dialog__body--message": variant === "message" })

	return (
		<Overlay2
			isOpen={isOpen}
			canEscapeKeyClose={closable}
			canOutsideClickClose={closable}
			enforceFocus
			hasBackdrop
			usePortal
			onClose={onClose}
			className={Classes.OVERLAY_SCROLL_CONTAINER}
		>
			<div className="dialog">
				<div className={bodyCls}>{body}</div>
				<div className="dialog__footer">{footer}</div>
			</div>
		</Overlay2>
	)
}

export default Dialog
