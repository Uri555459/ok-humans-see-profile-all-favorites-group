import type { ILinkItem } from '../@types'
import { createBrowserAndPage, login, saveFileJson } from '../utils'

const selectorContainer = 'div.ugrid_cnt'
const namePrevData = 'prevData.json'

let flag = true

// Функция запуска
export const parserUserLinkProfileData = async (
	groupUsersUrlFragment: string,
) => {
	// Настраиваем браузер

	const { browser, page } = await createBrowserAndPage(groupUsersUrlFragment, {
		// devtools: true,
		headless: true,
	})

	// Логинимся
	login(page)

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
				const showMoreButton = document.querySelector(
					'a.js-show-more.link-show-more',
				) as HTMLAnchorElement

				const linkArray: ILinkItem[] = []

				const items = Array.from(document.querySelectorAll('div.ugrid_i'))

				items.forEach((item, index) => {
					const link = item.querySelector('a')?.href as string
					linkArray.push({ link, id: index })
				})

				setTimeout(() => showMoreButton.click(), 5000)

				console.log(linkArray.length)

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
