import type { ReactNode } from "react"

export type DialogVariant = "message" | "text"

export interface DialogProps {
	isOpen: boolean
	// lets Escape and a backdrop click close the dialog
	closable: boolean
	onClose: () => void
	variant: DialogVariant
	body: ReactNode
	footer: ReactNode
}

export interface DialogButtonProps {
	label: string
	onClick: () => void
	icon?: string
	muted?: boolean
}
