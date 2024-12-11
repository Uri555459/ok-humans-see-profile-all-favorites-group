import fs from 'fs'
import type { Page } from 'puppeteer'

const inputSearchSelector = 'input.input__control'
const buttonSubmitSelector = 'button.button'

export const addQueryToSearchForm = async (
	page: Page,
	waitSelector: string,
	query: string,
) => {
	// Sleep for not search form
	await page.waitForSelector(waitSelector)

	const inputValue = await page.$eval(inputSearchSelector, el => el.value)
	// Clear input value
	await page.click(inputSearchSelector)
	for (let i = 0; i < inputValue.length; i++) {
		await page.keyboard.press('Backspace')
	}

	// Added search query
	await page.type(inputSearchSelector, query)

	// Clicked button submit
	await page.click(buttonSubmitSelector)
}

export const saveFileJson = <T>(fileName: string, data: T) => {
	// Проверяем существуют ли данные
	if (!fs.existsSync(fileName)) {
		// создаём файл
		fs.writeFileSync(fileName, JSON.stringify({ data }))
	} else {
		fs.writeFileSync(fileName, JSON.stringify({ data }))
	}
}
