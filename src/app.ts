import 'dotenv/config'

import { parserUserLinkProfileData } from './parser'

const start = async () => {
	// await import('./parser/parserUserFriendMeAllGroup')
	await parserUserLinkProfileData()
}
start()
