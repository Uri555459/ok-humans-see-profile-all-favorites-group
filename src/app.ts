import 'dotenv/config'

import { parserUserFriendMeAllGroup } from './parser'

const groupName = '/frilansuda/members'

const start = async () => {
	// await parserUserLinkProfileData(groupName)
	await parserUserFriendMeAllGroup()
}
start()
