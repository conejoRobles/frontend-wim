import { horariosConstants } from '../constants/horarios'


export const horariosLoad = (horarios) => ({
	type: horariosConstants.LOAD,
	favoritos: horarios
})

export const agregarHo = (horario, recorrido) => ({
	type: horariosConstants.ADD,
	horario,
	recorrido
})

export const agregarFav = (item) => ({
	type: horariosConstants.FAV,
	horario: item
})

export const eliminarHorario = (horario, recorrido) => ({
	type: horariosConstants.REMOVE,
	horario,
	recorrido
})

export const editarHorario = (horario, recorrido) => ({
	type: horariosConstants.EDIT,
	horario,
	recorrido
})