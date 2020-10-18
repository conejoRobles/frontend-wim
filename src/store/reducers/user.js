const initialState = {
    nombre: '',
    pass: '',
    correo: '',
    rut: '',
    telefono: '',
    recorridos: [],
}
export default (state = initialState, action) => {
    console.log(state)
    return state
}