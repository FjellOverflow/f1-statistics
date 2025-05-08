import type { ReactNode } from 'react'
import Footer, { type FooterProps } from '../components/Footer'
import Header, { type HeaderProps } from '../components/Header'

export interface BasicTemplateProps {
	header?: HeaderProps
	footer?: FooterProps
	backgroundColorHex?: `#${string}`
	children?: ReactNode
}

export default function BasicTemplate({
	children,
	header,
	footer,
	backgroundColorHex = '#E10600'
}: BasicTemplateProps): ReactNode {
	return (
		<div tw={`flex flex-col bg-[${backgroundColorHex}] w-full h-full`}>
			<div tw={`flex p-8 text-[${header?.textColorHex || '#FFFFFF'}]`}>
				<Header {...header} />
			</div>

			<div tw="flex">{children}</div>

			<div tw="mt-auto flex p-8">
				<Footer {...footer} />
			</div>
		</div>
	)
}
