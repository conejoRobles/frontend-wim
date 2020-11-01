import { recorridosConstants } from '../constants/recorridos'


export const recorridosLoad = (recorridos) => ({
	type: recorridosConstants.LOAD,
	recorridos
})

export const agregarRec = (recorrido) => ({
	type: recorridosConstants.ADD,
	recorrido
})

export const eliminarRecorrido = (recorrido) => ({
	type: recorridosConstants.REMOVE,
	recorrido
})

export const editarRecorrido = (recorrido) => ({
	type: recorridosConstants.EDIT,
	recorrido
})