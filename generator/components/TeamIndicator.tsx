import type { ReactNode } from 'react'

export interface TeamIndicatorProps {
	teamIndicatorColorHex: `#${string}`
}

export default function TeamIndicator({
	teamIndicatorColorHex
}: TeamIndicatorProps): ReactNode {
	return (
		<div
			style={{
				marginTop: 'auto',
				marginBottom: 'auto',
				marginRight: '8px',
				height: '20px',
				width: '4px',
				backgroundColor: teamIndicatorColorHex
			}}
		/>
	)
}
