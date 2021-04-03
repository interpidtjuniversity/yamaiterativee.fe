

class IterationChildrenState {
    PipelineStateInit = "Init"
    PipelineStateRunning = "Running"
    PipelineStateFinish = "Finish"
    PipelineStateCanceled = "Canceled"
    PipelineStateError = "Error"
    PipelineStateUnKnown = "Unknown"

    StageStateInit = "Init"
    StageStateReady = "Ready"
    StageStateCanceled = "Canceled"
    StageStateFinish = "Finish"
    StageStateFailure = "Failure"
    StageStateUnknown = "Unknown"

    StepStateInit = "Init"
    StepStateRunning = "Running"
    StepStateFinish = "Finish"
    StepStateFailure = "Failure"
    StepStateUnknown = "UnKnown"

    ColorMap = new Map([["Init", "#aaa6a6"],["Running", "#1F49E0"],["Finish", "#1DC11D"],["Error","#FF3333"],["Unknown","#aaa6a6"],["Failure","#FF3333"]])
    StepIconMap = new Map([["Init", "ellipsis"],["Running","loading"],["Finish","success"],["Failure","error"],["Unknown","ellipsis"]])
}




export default IterationChildrenState