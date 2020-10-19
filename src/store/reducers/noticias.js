import { noticiasConstants } from '../constants/noticias'

const initialState = []


export default (state = initialState, action) => {
	switch (action.type) {
		case noticiasConstants.LOAD: (state, payload) => ([
			...state,
			payload
		])
		case noticiasConstants.ERROR: (state) => ([
			...state,
		])
		case noticiasConstants.ADD: (state) => ({
			...state,
		})
		default:
			return { ...state }

	}
}