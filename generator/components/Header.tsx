import type { ReactNode } from 'react'

export interface HeaderProps {
	textColorHex?: `#${string}`
	title?: string
	subtitle?: string
	description?: string
}

export default function Header({
	title,
	subtitle,
	description,
	textColorHex = '#FFFFFF'
}: HeaderProps): ReactNode {
	return (
		<div tw={`flex flex-col text-[${textColorHex}]`}>
			{title && <div tw="mb-8 text-8xl italic font-bold">{title}</div>}

			{subtitle && (
				<div tw="mb-8 text-5xl italic font-semibold">{subtitle}</div>
			)}

			{description && <div tw="mb-8 text-3xl">{description}</div>}
		</div>
	)
}
