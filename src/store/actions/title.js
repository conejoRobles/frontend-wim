import { titleConstants } from '../constants/title'

export const changeTitle = (text) => ({
	type: titleConstants.CHANGE,
	text
})

