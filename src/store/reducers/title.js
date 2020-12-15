import { titleConstants } from '../constants/title'

const initialState = {
	text: ''
}


export default (state = initialState, action) => {

	switch (action.type) {
		case titleConstants.CHANGE:
			return ({
				...state,
				text: action.text
			})
			break
		default:
			return state
	}

}