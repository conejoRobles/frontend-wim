import { horariosConstants } from '../constants/horarios'

const initialState = {
    data: []
}


export default (state = initialState, action) => {
    switch (action.type) {
        case horariosConstants.FAV:
            recorridos = [...state.data]
            let reco = recorridos.map(x => {
                if (x.origen == action.horario.origen && x.destino == action.horario.destino) {
                    x.Horarios.push(action.horario)
                }
                return x
            })
            return ({
                ...state,
                data: reco
            })
            break
        case horariosConstants.LOAD:
            return ({
                ...state,
                data: action.favoritos
            })
            break
        default:
            return { ...state }

    }
}