import { empresasConstants } from '../constants/empresas'

const initialState = []


export default (state = initialState, action) => {
    switch (action.type) {
        case empresasConstants.LOAD: (state, payload) => ([
            ...state,
            payload
        ])
        case empresasConstants.ERROR: (state) => ([
            ...state,
        ])
        default:
            return { ...state }

    }
}