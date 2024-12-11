import 'dotenv/config'

import { parserUserFriendMeAllGroup, parserUserLinkProfileData } from './parser'

const start = async () => {
	await parserUserLinkProfileData()
	await parserUserFriendMeAllGroup()
}
start()
