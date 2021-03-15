// src/store/index.js
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import stepLogReducer from './reducers/steplog_reducer'

const middlewares = [
    thunkMiddleware,
    createLogger()
]

const store = createStore(stepLogReducer, applyMiddleware(...middlewares))

export default store