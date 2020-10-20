import { noticiasConstants } from '../constants/noticias'

const initialState = {
	data: []
}


export default (state = initialState, action) => {
	switch (action.type) {
		case noticiasConstants.LOAD:
			let noticias = action.noticias
			return ({
				...state,
				data: noticias
			})
			break
		case noticiasConstants.ERROR:
			return state
			break
		case noticiasConstants.REMOVE:
			return ({
				...state,
				data: state.data.filter(x => x.id != action.noticia.id)
			})
			break
		default:
			return state
	}

}