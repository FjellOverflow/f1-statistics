import { Database } from 'bun:sqlite'

import generate from './generator'
import { TableTemplate } from './generator/templates'

// we open a read-only connection to the database
const db = new Database('f1db.db', { readonly: true })

// we execute some raw SQL query
// it will return the current F1 seasons drivers
const rawTable = db
	.query(await Bun.file('sql/queries/current_drivers.sql').text())
	.all() as Record<string, string>[]

// we define the color codes for the different teams
const teamHexCodes = {
	'Red Bull': '#3671C6',
	Mercedes: '#27F4D2',
	Ferrari: '#E80020',
	McLaren: '#FF8000',
	'Aston Martin': '#229971',
	Alpine: '#0093CC',
	Williams: '#64C4FF',
	'Racing Bulls': '#6692FF',
	'Kick Sauber': '#52E252',
	Haas: '#B6BABD'
} as Record<string, string>

// we filter, format and sort the data we want to render
const table = rawTable
	.map((row) => ({
		Number: row.driver_number,
		Name: row.driver_name,

		// "::<color in HEX>" will add a colored bar to the cell, e.g. to indicate the driver's team
		Team: `${row.team_name}::${teamHexCodes[row.team_name]}`,

		// "::<country code>" will add a country flag to the cell, e.g. "Germany:de" will add a German flag
		Nationality: `${row.country_name}::${row.country_code.toLowerCase()}`,
		Birthday: new Date(row.driver_birthday).toLocaleDateString()
	}))
	.sort((driver1, driver2) => Number(driver1.Number) - Number(driver2.Number))

// we initialize the template with a configuration
const template = TableTemplate({
	table, // the actual table data, mandatory

	// all optional
	header: {
		title: `F1 drivers ${new Date().getFullYear()}`,
		subtitle: 'All drivers of the current Formula 1 season.',
		description:
			'Note: Liam Lawson and Yuki Tsunoda appear twice, having driven for both Racing Bulls and Red Bull in the current season.',
		textColorHex: '#FFFFFF' // default: white (#FFFFFF)
	},

	// all optional
	footer: {
		text: 'Generated with github.com/FjellOverflow/f1-statistics',
		textColorHex: '#FFFFFF' // default: white (#FFFFFF)
	},

	backgroundColorHex: '#E10600' // optional, default red (#E10600)
})

// we generate the actual image
generate(
	template, // the configured template
	'png', // output format, optional, default: 'svg', options: ['png', 'svg']
	'current_drivers.png', // output path, optional, default: 'output'
	1000, // width in px, optional, default: 1000
	1500 // width in px, optional, default: 1000
)

// we close the connection
db.close()
