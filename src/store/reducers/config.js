import stepLogReducer from './steplog_reducer'
import iterEnvPipelineInfoReducer from './iter_env_pipelineinfo_reducer'
import { combineReducers } from 'redux'

const reducers = combineReducers ({
    stepLogReducer,
    iterEnvPipelineInfoReducer
})
export default reducers