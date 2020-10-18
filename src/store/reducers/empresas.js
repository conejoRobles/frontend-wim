const initialState = []

const LOAD = 'LOAD'

export const load = () => ({
    type: LOAD,
    payload: 'wena'
})



export default (state = initialState, action) => {
    console.log(action)
    return state
}