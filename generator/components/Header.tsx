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
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				color: textColorHex
			}}
		>
			{title && (
				<div
					style={{
						marginBottom: '32px',
						fontSize: '96px',
						fontWeight: '700',
						fontStyle: 'italic',
						lineHeight: '1'
					}}
				>
					{title}
				</div>
			)}

			{subtitle && (
				<div
					style={{
						marginBottom: '32px',
						fontSize: '48px',
						fontWeight: '600',
						fontStyle: 'italic',
						lineHeight: '1'
					}}
				>
					{subtitle}
				</div>
			)}

			{description && (
				<div
					style={{
						marginBottom: '32px',
						lineHeight: '36px',
						fontSize: '30px'
					}}
				>
					{description}
				</div>
			)}
		</div>
	)
}
