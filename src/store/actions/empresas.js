import { empresasConstants } from '../constants/empresas'

export const empresasLoad = (empresas) => ({
    type: empresasConstants.LOAD,
    empresas
})
