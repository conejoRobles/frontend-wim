import { noticiasConstants } from '../constants/noticias'

const initialState = {
	data: []
}


export default (state = initialState, action) => {
	switch (action.type) {
		case noticiasConstants.LOAD:

			let noticias = Object.values(action.noticias)
			return ({
				...state,
				data: noticias
			})
			break
		case noticiasConstants.ERROR:
			return state
			break
		case noticiasConstants.EDIT:
			let arr = [...state.data]
			console.log('EDIT', arr)
			return ({
				...state,
				data: arr.map(x => {
					return x.id == action.noticia.id ? (
						{ ...x, ...action.noticia }
					) : (
							x
						)
				})
			})
			break
		case noticiasConstants.ADD: {
			let arr = [...state.data]
			arr.push(action.noticia)
			console.log('noticia', action.noticia)
			return { ...state, data: arr }
		}
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