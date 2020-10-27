import { noticiasConstants } from '../constants/noticias'


export const noticiasLoad = (noticias) => ({
	type: noticiasConstants.LOAD,
	recorrido,
	noticias
})

export const agregar = (noticia, recorrido) => ({
	type: noticiasConstants.ADD,
	recorrido,
	noticia
})

export const eliminarNoticia = (noticia, recorrido) => ({
	type: noticiasConstants.REMOVE,
	recorrido,
	noticia
})

export const editar = (noticia, recorrido) => ({
	type: noticiasConstants.EDIT,
	recorrido,
	noticia
})