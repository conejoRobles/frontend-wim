import { noticiasConstants } from '../constants/noticias'



export const noticiasLoad = (noticias) => ({
	type: noticiasConstants.LOAD,
	noticias
})

export const agregar = (noticia) => ({
	type: noticiasConstants.ADD,
	noticia
})

export const eliminarNoticia = (noticia) => ({
	type: noticiasConstants.REMOVE,
	noticia
})

export const editar = (noticia) => ({
	type: noticiasConstants.EDIT,
	noticia
})