import classNames from "classnames"
import type { DialogButtonProps } from "./types"

export const DialogButton = ({ label, onClick, icon, muted = false }: DialogButtonProps) => {
	const cls = classNames("dialog__button", { "dialog__button--muted": muted })
	const iconCls = classNames("dialog__button-icon", icon)

	return (
		<button type="button" className={cls} onClick={onClick}>
			{icon && <i className={iconCls} />}
			{label}
		</button>
	)
}
