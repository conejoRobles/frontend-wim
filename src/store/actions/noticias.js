import { noticiasConstants } from '../constants/noticias'



export const noticiasLoad = (noticias) => ({
	type: noticiasConstants.LOAD,
	noticias
})