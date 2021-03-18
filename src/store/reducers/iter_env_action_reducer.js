import { SetIterEnvActionInfo, IterEnvActionInfoInitialState } from '../constants/iter_env_action_const'

export default function iterEnvActionInfoReducer (state = IterEnvActionInfoInitialState, action) {
    switch (action.type) {
        case SetIterEnvActionInfo:
            return {
                ...state,
                iterEnvActionInfo: action.iterEnvActionInfo
            }
        default:
            return state
    }
}