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

	return <div tw={`ml-auto text-[${textColorHex}] text-3xl`}>{text}</div>
}
