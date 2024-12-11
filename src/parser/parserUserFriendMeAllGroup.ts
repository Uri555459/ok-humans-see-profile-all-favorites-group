import fs from 'fs'
import puppeteer from 'puppeteer'

import type { ILinksData } from '../@types'
import { CONSTANTS } from '../constants'

// let flag = true
let count = 0

// Функция запуска
export const parserUserFriendMeAllGroup = async () => {
	// Настраиваем браузер
	const browser = await puppeteer.launch({
		headless: false,
		slowMo: 100,
		devtools: false,
	})
	const page = await browser.newPage()
	// // // Переходим на страницу и ждем ее полной загрузки
	// // Устанавливаем размер окна
	// await page.setViewport({ width: 1080, height: 1024 })
	// await page.click('a.h-mod.al')
	// await page.waitForSelector('form')
	// await page.type('input[name="st.email"]', login)
	// await page.type('input[name="st.password"]', password)
	// await page.click('button[type="submit"]')
	// await page.waitForSelector(selectorContainer)

	// Переходим на страницу и ждем ее полной загрузки
	// Читаем файл
	const { data }: ILinksData = JSON.parse(
		fs.readFileSync(CONSTANTS.namePrevData, 'utf8'),
	)
	try {
		while (data.length >= count) {
			await page.goto(data[count].link, { waitUntil: 'domcontentloaded' })
			await page.setViewport({ width: 1080, height: 1024 })

			try {
				await page.click('button.button__pe9qo.button-core-container__0ej09')
				await page.type('input[name="st.email"]', process.env.LOGIN as string)
				await page.type(
					'input[name="st.password"]',
					process.env.PASSWORD as string,
				)
				await page.click('button[type="submit"]')
			} catch (error) {
				console.error(error)
			}

			try {
				await page.waitForSelector('a[aria-label="Добавить в друзья"]', {
					timeout: 3000,
				})
			} catch (error) {
				console.error(
					'Ошибка ожидания селектора кнопки, добавить в друзья',
					error,
				)
			}

			try {
				await page.click('a[aria-label="Добавить в друзья"]')
				// aria-label="Добавить в друзья"
			} catch (error) {
				// await page.click('a[aria-label="Add to friends"]')
				console.error(error)
			}
			count++
			// browser.close()
		}
		// const browser = await puppeteer.launch({
		// 	headless: false,
		// 	slowMo: 100,
		// 	devtools: false,
		// })
		// const page = await browser.newPage()
		// const browser = await puppeteer.launch({
		// 	headless: false,
		// 	slowMo: 100,
		// 	devtools: false,
		// })
		// const page = await browser.newPage()
		// // Переходим на страницу и ждем ее полной загрузки
		// // Читаем файл
		// const { data }: IData = JSON.parse(fs.readFileSync(namePrevData, 'utf8'))
		// // Переходим на страницу и ждем ее полной загрузки
		// // Читаем файл
		// const { data }: IData = JSON.parse(fs.readFileSync(namePrevData, 'utf8'))
		// data.forEach(async ({ link }) => {
		// 	await page.goto(link, { waitUntil: 'domcontentloaded' })
		// 	// // Устанавливаем размер окна
		// 	await page.setViewport({ width: 1080, height: 1024 })
		// 	await page.click('a[aria-label="Добавить в друзья"]')
		// 	browser.close()
		// })
		// await page.click('a.h-mod.al')
	} catch (error) {
		console.error('Хуйня какая то произошла', error)
	}
	// Забираем email
	// const email = await page.$eval('#email_id', elem => elem.textContent)
	// Если не нашли email, то выходим
}
