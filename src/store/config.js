// src/store/index.js
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducers from "./reducers/config";

const middlewares = [
    thunkMiddleware,
    createLogger()
]

const store = createStore(reducers, applyMiddleware(...middlewares))

export default store