
import { userConstants } from '../constants/user'

const initialState = {
    nombre: '',
    pass: '',
    correo: '',
    rut: '',
    telefono: '',
    recorridos: [],
    rol: ''
}
export default (state = initialState, action) => {
    switch (action.type) {
        case userConstants.LOGIN:
            let user = action.user
            return ({
                ...state,
                nombre: user.nombre,
                pass: user.pass,
                correo: user.correo,
                rut: user.rut,
                telefono: user.telefono,
                recorridos: user.recorridos || [],
                rol: user.rol || '',

            })
            break
        case userConstants.LOGOUT:
            return ({
                nombre: '',
                pass: '',
                correo: '',
                rut: '',
                telefono: '',
                recorridos: [],
                rol: '',

            })
            break
        case userConstants.ERROR:
            return ({
                ...state
            })
            break
        default:
            return { ...state }
    }

}