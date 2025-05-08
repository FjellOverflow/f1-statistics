declare global {
	declare module 'react' {
		interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
			tw?: string
		}
	}
}
