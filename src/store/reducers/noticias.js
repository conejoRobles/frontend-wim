import { noticiasConstants } from '../constants/noticias'

const initialState = {
	data: []
}


export default (state = initialState, action) => {
	switch (action.type) {
		case noticiasConstants.LOAD:
			let noticias = action.noticias
			noticias = noticias.concat(state.data)
			return ({
				...state,
				data: noticias
			})
			break
		case noticiasConstants.ERROR:
			return state
			break
		default:
			return state
	}

}