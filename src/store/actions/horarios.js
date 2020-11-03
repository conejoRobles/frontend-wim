import { horariosConstants } from '../constants/horarios'


export const horariosLoad = (horarios) => ({
	type: horariosConstants.LOAD,
	horarios
})

export const agregarHo = (horario, recorrido) => ({
	type: horariosConstants.ADD,
	horario,
	recorrido
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