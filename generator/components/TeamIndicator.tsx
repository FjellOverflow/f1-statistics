import type { ReactNode } from 'react'

export interface TeamIndicatorProps {
	teamIndicatorColorHex: `#${string}`
}

export default function TeamIndicator({
	teamIndicatorColorHex
}: TeamIndicatorProps): ReactNode {
	return (
		<div tw={`mr-2 my-auto w-[4px] h-[20px] bg-[${teamIndicatorColorHex}]`} />
	)
}
