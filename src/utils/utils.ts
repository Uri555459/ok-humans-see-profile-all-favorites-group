import fs from 'fs'
import type { LaunchOptions, Page } from 'puppeteer'
import puppeteer from 'puppeteer'

import { CONSTANTS } from '../constants'

export const formatUrl = (urlFragment: string) => {
	return CONSTANTS.baseUrl + urlFragment
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

export const login = async (page: Page) => {
	try {
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
	} catch (error) {
		console.error('Ошибка логина', error)
	}
}

export const createBrowserAndPage = async (
	groupUsersUrlFragment: string,
	options?: LaunchOptions,
) => {
	const browser = await puppeteer.launch({
		headless: false,
		slowMo: 100,
		devtools: false,
		...options,
	})

	const page = await browser.newPage()

	// // Переходим на страницу и ждем ее полной загрузки
	await page.goto(formatUrl(groupUsersUrlFragment), {
		waitUntil: 'domcontentloaded',
	})

	return { browser, page }
}
