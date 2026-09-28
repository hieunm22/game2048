import type { ConfirmHandler, ConfirmOptions } from "./types"

let handler: ConfirmHandler | null = null

export function registerConfirmHandler(next: ConfirmHandler | null) {
	handler = next
}

// resolves to true on Ok and false on Cancel, or false when no provider is mounted
export function openPopup(options: ConfirmOptions = {}) {
	if (!handler) return Promise.resolve(false)
	return handler(options)
}
