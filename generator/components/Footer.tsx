import type { ReactNode } from 'react'

export interface FooterProps {
	textColorHex?: `#${string}`
	text?: string
}

export default function Footer({
	text,
	textColorHex = '#FFFFFF'
}: FooterProps): ReactNode {
	if (!text) return <></>

	return (
		<div
			style={{
				marginLeft: 'auto',
				fontSize: '30px',
				color: textColorHex,
				lineHeight: '36px'
			}}
		>
			{text}
		</div>
	)
}
