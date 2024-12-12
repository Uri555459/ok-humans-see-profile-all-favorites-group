import 'dotenv/config'

import { parserUserLinkProfileData } from './parser'

const groupName = '/frilansuda/members'

const start = async () => {
	await parserUserLinkProfileData(groupName)
	// await parserUserFriendMeAllGroup()
}
start()
