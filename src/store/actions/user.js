import { userConstants } from '../constants/user'

export const inicioSesion = (user) => ({
	type: userConstants.LOGIN,
	user
})

export const logout = () => ({
	type: userConstants.LOGOUT,
})
