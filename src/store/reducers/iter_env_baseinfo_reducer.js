import { SetIterEnvBaseInfo, IterEnvBaseInfoInitialState } from '../constants/iter_env_baseinfo_const'

export default function iterEnvActionInfoReducer (state = IterEnvBaseInfoInitialState, action) {
    switch (action.type) {
        case SetIterEnvBaseInfo:
            return {
                ...state,
                iterEnvBaseInfo: action.iterEnvBaseInfo
            }
        default:
            return state
    }
}