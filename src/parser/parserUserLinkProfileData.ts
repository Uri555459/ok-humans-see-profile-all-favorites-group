import puppeteer from 'puppeteer'

import type { ILinkItem } from '../@types'
import { CONSTANTS } from '../constants'
import { saveFileJson } from '../utils'

const selectorContainer = 'div.ugrid_cnt'
const namePrevData = 'prevData.json'

let flag = true

// Функция запуска
export const parserUserLinkProfileData = async () => {
	// Настраиваем браузер
	const browser = await puppeteer.launch({
		headless: false,
		slowMo: 100,
		devtools: false,
	})
	const page = await browser.newPage()

	// // Переходим на страницу и ждем ее полной загрузки
	await page.goto(CONSTANTS.baseUrl + '/natalya.marinicheva/friends', {
		waitUntil: 'domcontentloaded',
	})

	// Устанавливаем размер окна
	await page.setViewport({ width: 1080, height: 1024 })

	// Клик по кнопке "Войти"
	await page.click('a.h-mod.al')
	//Ждем появления формы
	await page.waitForSelector('form')
	//Вводим логин
	await page.type('input[name="st.email"]', process.env.LOGIN as string)
	//Вводим пароль
	await page.type('input[name="st.password"]', process.env.PASSWORD as string)
	//Кликаем по кнопке "Войти"
	await page.click('button[type="submit"]')
	//Ждем появления контейнера с пользователем
	await page.waitForSelector(selectorContainer)
	//Получаем количество пользователей
	const counter = Number(
		await page.$eval('span.navMenuCount', elem => elem.textContent),
	)

	try {
		while (flag) {
			const links = (await page.evaluate(() => {
				window.scrollTo(0, document.body.scrollHeight)

				const linkArray: ILinkItem[] = []

				const items = Array.from(document.querySelectorAll('div.ugrid_i'))

				items.forEach((item, index) => {
					const link = item.querySelector('a')?.href as string
					linkArray.push({ link, id: index })
				})

				return linkArray
			})) as ILinkItem[]
			saveFileJson(namePrevData, links)

			if (links.length === counter) {
				flag = false
				console.log(
					`Парсинг пользователей закончен и помещён в файл prevData.json. Количество пользователей: ${links.length}`,
				)

				browser.close()
			}
		}
	} catch (error) {
		flag = false
		console.error('Страница закончилась', error)
	}
}
