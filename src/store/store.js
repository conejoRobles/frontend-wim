import { createStore, combineReducers } from 'redux'
import { userConstants } from '../store/constants/user'
import * as reducers from './reducers'

const appReducer = combineReducers({
    ...reducers,
})

const initialState = {}
const rootReducer = (state = initialState, action) => {

    if (action.type == userConstants.LOGOUT) {
        state = undefined
    }
    return appReducer(state, action)
}

export default createStore(rootReducer)