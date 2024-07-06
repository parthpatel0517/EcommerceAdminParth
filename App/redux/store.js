import { createStore, applyMiddleware } from 'redux'

import { rootReducer } from './reducer'
import { thunk } from 'redux-thunk'


export const configurestore = () => {
    const store = createStore(rootReducer,applyMiddleware(thunk))

    return store
}
