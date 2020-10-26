import { empresasConstants } from '../constants/empresas'

const initialState = {
    data: []
}


export default (state = initialState, action) => {
    switch (action.type) {

        case empresasConstants.LOAD:
            return ({
                ...state,
                data: [...state.data, ...action.empresas]
            })
            break

        default:
            return { ...state }

    }
}