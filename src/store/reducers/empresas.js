import { empresasConstants } from '../constants/empresas'
import { noticiasConstants } from '../constants/noticias'

const initialState = {
    data: []
}


export default (state = initialState, action) => {
    console.log('action', action.type)
    switch (action.type) {

        case empresasConstants.LOAD:
            return ({
                ...state,
                data: [...state.data, ...action.empresas]
            })
            break

        case noticiasConstants.LOAD:
            return ({
                ...state,
                data: noticias
            })
            break
        case noticiasConstants.ERROR:
            return state
            break
        case noticiasConstants.EDIT:
            let recorridos = [...state.data]
            let reco = recorridos.map(recorrido => {
                if (recorrido.id == action.recorrido) {
                    let noticias = recorrido.Noticias ? Object.values(recorrido.Noticias) : []
                    noticias = noticias.map(x => {
                        if (x.id == action.noticia.id) {
                            x = { ...x, ...action.noticia }
                        }
                        return x
                    })
                    recorrido.Noticias = noticias
                }
                return recorrido
            })
            return ({
                ...state,
                data: reco
            })
            break
        case noticiasConstants.ADD:
            recorridos = [...state.data]
            reco = recorridos.map(recorrido => {
                if (recorrido.id == action.recorrido) {
                    let noticias = recorrido.Noticias ? Object.values(recorrido.Noticias) : []
                    noticias.unshift(action.noticia)
                    recorrido.Noticias = noticias
                }
                return recorrido
            })
            return ({
                ...state,
                data: reco
            })
            break
        case noticiasConstants.REMOVE:
            console.log('action', action.type)
            recorridos = [...state.data]
            reco = recorridos.map(recorrido => {
                console.log('recorrido', recorrido.id)
                console.log('RECORRIDO', action.recorrido)
                if (recorrido.id == action.recorrido) {
                    let noticias = recorrido.Noticias ? Object.values(recorrido.Noticias) : []
                    noticias = noticias.filter(x => x.id != action.noticia.id)
                    console.log('noticias filtradas', noticias)
                    recorrido.Noticias = noticias
                }
                return recorrido
            })
            return ({
                ...state,
                data: reco
            })
            break
        default:
            return { ...state }

    }
}