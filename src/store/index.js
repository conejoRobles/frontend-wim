import { createStore } from 'redux'
import rootReducer from './reducers/index'

export default () => {
    return store = createStore(
        rootReducer
    )
}