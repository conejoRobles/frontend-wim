import { horariosConstants } from '../constants/horarios'


export const horariosLoad = (horarios) => ({
	type: horariosConstants.LOAD,
	horarios
})

export const agregarRec = (horario) => ({
	type: horariosConstants.ADD,
	horario
})

export const eliminarhorario = (horario) => ({
	type: horariosConstants.REMOVE,
	horario
})

export const editarhorario = (horario) => ({
	type: horariosConstants.EDIT,
	horario
})