import type { ReactNode } from 'react'
import Footer, { type FooterProps } from '../components/Footer'
import Header, { type HeaderProps } from '../components/Header'

export type BasicTemplateProps = {
	header?: HeaderProps
	footer?: FooterProps
	children?: ReactNode
	backgroundColorHex?: `#${string}`
	backgroundImageUrl?: string
}

export default function BasicTemplate({
	children,
	header,
	footer,
	backgroundColorHex = '#E10600',
	backgroundImageUrl
}: BasicTemplateProps): ReactNode {
	const style = {} as Record<string, string>

	if (backgroundImageUrl) {
		style.backgroundImage = `url(${backgroundImageUrl})`
		style.backgroundSize = 'cover'
	} else style.backgroundColor = backgroundColorHex

	return (
		<div
			style={{
				display: 'flex',
				height: '100%',
				width: '100%',
				flexDirection: 'column',
				...style
			}}
		>
			<div
				style={{
					display: 'flex',
					padding: '32px',
					color: header?.textColorHex || '#FFFFFF'
				}}
			>
				<Header {...header} />
			</div>

			<div
				style={{
					display: 'flex'
				}}
			>
				{children}
			</div>

			<div
				style={{
					marginTop: 'auto',
					display: 'flex',
					padding: '32px'
				}}
			>
				<Footer {...footer} />
			</div>
		</div>
	)
}
