import stepLogReducer from './steplog_reducer'
import iterEnvPipelineInfoReducer from './iter_env_pipelineinfo_reducer'
import iterEnvActionInfoReducer from "./iter_env_action_reducer";
import iterEnvBaseInfoReducer from "./iter_env_baseinfo_reducer"
import { combineReducers } from 'redux'

const reducers = combineReducers ({
    stepLogReducer,
    iterEnvPipelineInfoReducer,
    iterEnvActionInfoReducer,
    iterEnvBaseInfoReducer
})
export default reducers