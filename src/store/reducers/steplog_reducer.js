import { SetStepLogRef } from '../constants/steplog_const'
import { StepLogRefInitialState } from "../constants/steplog_const";

export default function stepLogReducer (state = StepLogRefInitialState, action) {
    switch (action.type) {
        case SetStepLogRef:
            return {
                ...state,
                stepLogRef: action.stepRef
            }
        default:
            return state
    }
}