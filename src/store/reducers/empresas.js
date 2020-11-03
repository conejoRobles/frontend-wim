import { empresasConstants } from '../constants/empresas'
import { noticiasConstants } from '../constants/noticias'
import { recorridosConstants } from '../constants/recorridos'
import { horariosConstants } from '../constants/horarios'

const initialState = {
    data: []
}


export default (state = initialState, action) => {
    console.log('ACTION!', action.type)
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
            recorridos = [...state.data]
            reco = recorridos.map(recorrido => {
                if (recorrido.id == action.recorrido) {
                    let noticias = recorrido.Noticias ? Object.values(recorrido.Noticias) : []
                    noticias = noticias.filter(x => x.id != action.noticia.id)
                    recorrido.Noticias = noticias
                }
                return recorrido
            })
            return ({
                ...state,
                data: reco
            })
            break
        case recorridosConstants.ADD:
            recorridos = [...state.data]
            recorridos.push(action.recorrido)
            return ({
                ...state,
                data: recorridos
            })

            break
        case recorridosConstants.EDIT:
            recorridos = [...state.data]
            recorridos = recorridos.map(rec => {
                if (rec.id == action.recorrido.id) {
                    rec = { ...rec, ...action.recorrido }
                }
                return rec
            })
            return ({
                ...state,
                data: recorridos
            })
            break
        case recorridosConstants.REMOVE:
            recorridos = [...state.data]
            reco = recorridos.filter(x => x.id != action.recorrido.id)
            return ({
                ...state,
                data: reco
            })
            break
        case horariosConstants.ADD:
            recorridos = [...state.data]
            let horarios = {}
            reco = recorridos.map(x => {
                if (x.id == action.recorrido.id) {
                    if(x.Horarios == undefined){
                        x.Horarios = {}
                    }
                        horarios = x.Horarios 
                        horarios[action.horario.id] = action.horario
                        x = { ...x, Horarios: horarios }
                        console.log("X " , x.Horarios)
                }
                return x
            })
            return ({
                ...state,
                data: reco
            })
            break

        case horariosConstants.EDIT:
            recorridos = [...state.data]
            horarios = {}
            reco = recorridos.map(x => {
                if (x.id == action.recorrido.id) {
                    horarios = x.Horarios
                    horarios[action.horario.id] = { ...horarios[action.horario.id], ...action.horario }
                    x = { ...x, Horarios: horarios }
                }
                return x
            })
            return ({
                ...state,
                data: reco
            })
            break
        case horariosConstants.REMOVE:
            recorridos = [...state.data]
            reco = recorridos.map(recorrido => {
                if (recorrido.id == action.recorrido.id) {
                    delete recorrido.Horarios[action.horario.id]
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