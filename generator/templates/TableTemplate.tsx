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
			<div tw="flex mx-auto">
				{headers.map((header, x) => (
					// biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
					<div tw="flex flex-col">
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
	let border = ''
	if (x === 0) border += ' border-l border-l-black'
	if (x === dimensions.x - 1) border += ' border-r border-r-black'

	let rounded = ''
	if (x === 0) rounded = 'rounded-tl'
	if (x === dimensions.x - 1) rounded = 'rounded-tr'

	return (
		<div
			tw={`flex p-2 pl-4 pr-8 -m-[1px] text-lg font-bold bg-white border-b-[3px] border-b-[#EDEDED] border-t border-t-black ${border} ${rounded}`}
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
	const bg = y % 2 === 0 ? 'bg-white' : 'bg-[#F3F3F3]'

	let border = ''
	if (x === 0) border += ' border-l border-l-black'
	if (x === dimensions.x - 1) border += ' border-r border-r-black'
	if (y === dimensions.y - 1) border += ' border-b border-b-black'

	let rounded = ''
	if (x === 0 && y === dimensions.y - 1) rounded = 'rounded-bl'
	if (x === dimensions.x - 1 && y === dimensions.y - 1) rounded = 'rounded-br'

	return (
		<div tw={`flex p-2 pl-4 pr-8 -m-[1px] text-lg  ${bg} ${border} ${rounded}`}>
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
