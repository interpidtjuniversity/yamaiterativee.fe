import { SetIterEnvPipelineInfo } from '../constants/iter_env_pipelineinfo_const'
import { IterEnvPipelineInfoInitialState } from '../constants/iter_env_pipelineinfo_const'

export default function iterEnvPipelineInfoReducer (state = IterEnvPipelineInfoInitialState, action) {
    switch (action.type) {
        case SetIterEnvPipelineInfo:
            return {
                ...state,
                iterEnvPipelineInfo: action.iterEnvPipelineInfo
            }
        default:
            return state
    }
}