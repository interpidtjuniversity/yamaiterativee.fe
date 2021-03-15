// src/reducers/counter.js
import { Set } from '../constants/steplog_const'

export default function stepLogReducer (state = undefined, action) {
    switch (action.type) {
        case Set:
            return action.stepRef
        default:
            return state
    }
}