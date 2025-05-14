import type { ReactNode } from 'react'
import FlagIcon, { FLAGS, type FlagCountryCode } from '../components/FlagIcon'
import TeamIndicator from '../components/TeamIndicator'
import BasicTemplate, {
	type BasicTemplateProps
} from '../templates/BasicTemplate'

export type TableTemplateProps = BasicTemplateProps & {
	table: Record<string, string>[]
}

export default function TableTemplate({
	table,
	...props
}: TableTemplateProps): ReactNode {
	const headers = Object.keys(table[0])
	const dimensions = { x: headers.length, y: table.length }

	return (
		<BasicTemplate {...props}>
			<div
				style={{
					marginLeft: 'auto',
					marginRight: 'auto',
					display: 'flex'
				}}
			>
				{headers.map((header, x) => (
					// biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column'
						}}
					>
						<TableHeaderCell content={header} x={x} dimensions={dimensions} />

						{table.map((row, y) => (
							// biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
							<TableCell
								content={row[header]}
								x={x}
								y={y}
								dimensions={dimensions}
							/>
						))}
					</div>
				))}
			</div>
		</BasicTemplate>
	)
}

function hasFlagIcon(element: string): boolean {
	const [text, flagIconCountryCode] = element.split('::')
	return (
		!!flagIconCountryCode &&
		Object.values(FLAGS).includes(flagIconCountryCode as FlagCountryCode) &&
		text.length > 0
	)
}

function hasHexColor(element: string): boolean {
	const [text, hexColor] = element.split('::')
	return (
		!!hexColor &&
		hexColor.length === 7 &&
		hexColor.startsWith('#') &&
		text.length > 0
	)
}

const resolveText = (element: string): string => element.split('::')[0]

const resolveFlagCountryCode = (element: string) =>
	element.split('::')[1] as FlagCountryCode

const resolveHexColor = (element: string) =>
	element.split('::')[1] as `#${string}`

interface TableHeaderCellProps {
	content: string
	x: number
	dimensions: {
		x: number
		y: number
	}
}

function TableHeaderCell({ content, x, dimensions }: TableHeaderCellProps) {
	const style = {} as Record<string, string>

	if (x === 0) {
		style.borderLeftWidth = '1px'
		style.borderLeftColor = 'black'
	}
	if (x === dimensions.x - 1) {
		style.borderRightWidth = '1px'
		style.borderRightColor = 'black'
	}

	if (x === 0) {
		style.borderTopLeftRadius = '4px'
	}
	if (x === dimensions.x - 1) {
		style.borderTopRightRadius = '4px'
	}

	return (
		<div
			style={{
				...style,
				margin: '-1px',
				display: 'flex',
				borderTopColor: 'black',
				backgroundColor: 'white',
				padding: '8px',
				paddingLeft: '16px',
				paddingRight: '32px',
				fontSize: '18px',
				lineHeight: '28px',
				fontWeight: '700',
				borderBottomWidth: '3px',
				borderTopWidth: '1px',
				borderBottomColor: '#EDEDED'
			}}
		>
			{hasFlagIcon(content) && (
				<FlagIcon flagIconCountryCode={resolveFlagCountryCode(content)} />
			)}

			{hasHexColor(content) && (
				<TeamIndicator teamIndicatorColorHex={resolveHexColor(content)} />
			)}

			{resolveText(content)}
		</div>
	)
}

type TableCellProps = TableHeaderCellProps & {
	y: number
}

function TableCell({ content, x, y, dimensions }: TableCellProps) {
	const style = {} as Record<string, string>

	style.backgroundColor = y % 2 === 0 ? 'white' : '#F3F3F3'

	if (x === 0) {
		style.borderLeftWidth = '1px'
		style.borderLeftColor = 'black'
	}
	if (x === dimensions.x - 1) {
		style.borderRightWidth = '1px'
		style.borderRightColor = 'black'
	}
	if (y === dimensions.y - 1) {
		style.borderBottomWidth = '1px'
		style.borderBottomColor = 'black'
	}
	if (x === 0 && y === dimensions.y - 1) style.borderBottomLeftRadius = '4px'
	if (x === dimensions.x - 1 && y === dimensions.y - 1)
		style.borderBottomRightRadius = '4px'

	return (
		<div
			style={{
				...style,
				margin: '-1px',
				display: 'flex',
				padding: '8px',
				paddingLeft: '16px',
				paddingRight: '32px',
				fontSize: '18px'
			}}
		>
			{hasFlagIcon(content) && (
				<FlagIcon flagIconCountryCode={resolveFlagCountryCode(content)} />
			)}

			{hasHexColor(content) && (
				<TeamIndicator teamIndicatorColorHex={resolveHexColor(content)} />
			)}

			{resolveText(content)}
		</div>
	)
}
