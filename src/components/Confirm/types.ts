import type { ReactNode } from "react"

export interface ConfirmOptions {
	title?: string
	description?: string
}

export type ConfirmHandler = (options: ConfirmOptions) => Promise<boolean>

export interface ConfirmRequest {
	options: ConfirmOptions
	resolve: (confirmed: boolean) => void
}

export interface ConfirmProviderProps {
	children: ReactNode
}
