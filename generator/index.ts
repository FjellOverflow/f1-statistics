import { Resvg } from '@resvg/resvg-js'
import type { ReactNode } from 'react'
import type { SatoriOptions } from 'satori'
import satori from 'satori'

const FONT = { NORMAL: 'normal', ITALIC: 'italic' } as const
type SatoriFontStyle = (typeof FONT)[keyof typeof FONT]
type SatoriFontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900

const loadLocalFontFile = (weight: SatoriFontWeight, style: SatoriFontStyle) =>
	Bun.file(
		`generator/node_modules/@fontsource/titillium-web/files/titillium-web-latin-${weight}-${style}.woff`
	).arrayBuffer()

async function loadFonts(): Promise<SatoriOptions['fonts']> {
	const normalFontWeights: SatoriFontWeight[] = [200, 300, 400, 600, 700, 900]
	const italicFontWeights: SatoriFontWeight[] = [200, 300, 400, 600, 700]

	return [
		...(await Promise.all(
			normalFontWeights.map(async (weight) => ({
				name: 'Titillium Web',
				data: await loadLocalFontFile(weight, FONT.NORMAL),
				weight,
				style: FONT.NORMAL
			}))
		)),
		...(await Promise.all(
			italicFontWeights.map(async (weight) => ({
				name: 'Titillium Web',
				data: await loadLocalFontFile(weight, FONT.ITALIC),
				weight,
				style: FONT.ITALIC
			}))
		))
	]
}

export default async function generate(
	template: ReactNode,
	format: 'svg' | 'png' = 'svg',
	filePath = 'output',
	width = 1000,
	height = 1000
) {
	let outputPath = filePath
	if (!outputPath.endsWith(`.${format}`)) outputPath += `.${format}`

	const satoriOptions: SatoriOptions = {
		width,
		height,
		embedFont: true,
		fonts: await loadFonts()
	}

	const svg = await satori(template, satoriOptions)

	Bun.write(
		outputPath,
		format === 'svg' ? svg : new Resvg(svg).render().asPng()
	)
}
