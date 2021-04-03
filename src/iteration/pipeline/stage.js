import { Node } from 'butterfly-dag';
import $ from'jquery';
import '../../static/css/iteration/pipeline/stage.css'
import APIFetcher from "../../axios/task/APIFetcher";
import TaskExecutor from "../../axios/task/TaskExecutor";
import IterationChildrenState from "./const"

class Stage extends Node {

  state = {
    action: "Unknown",
    stage: "Unknown"
  }

  constructor(opts) {
    super(opts);
    this.options = opts;
    this.actionId_stageId = opts.actionId_stageId;
    this.stageId = opts.stageId
    this.actionId = opts.actionId
    this.actionState = opts.state
    this.stageStateRequestUrl = "/api/v1/iteration/"+opts.iterationId+"/action/"+this.actionId+"/stage/"+this.stageId+"/state"
    this.actionStateRequestUrl = "/api/v1/iteration/"+opts.iterationId+"/action/"+this.actionId+"/state"
    this.const = new IterationChildrenState()
    this.containerId = "stage"+this.actionId+"_"+this.stageId
  }

  draw(opts) {
    const container = $('<div id={this.containerId} class="schedule-base-node"/>')
        .attr('id', this.containerId)
        .css('top', opts.top + 'px')
        .css('left', opts.left + 'px')

    this._createTypeIcon(container);
    this._createText(container);
    this._createSteps(container);

    let stageFetcher = new APIFetcher(this.stageStateRequestUrl, this.parser, this.stageCallback)
    this.stageE = new TaskExecutor(stageFetcher, 1000)

    // let actionFetcher = new APIFetcher(this.actionStateRequestUrl, this.parser, this.actionCallback)
    // this.actionE = new TaskExecutor(actionFetcher, 3000)


    return container[0];
  }

  _createTypeIcon(dom = this.dom) {
    const iconContainer = $(`<span class="icon-box ${this.options.className}"></span>`)[0];
    const icon = $(`<i class="iconfont ${this.options.iconType}"></i>`)[0];
    iconContainer.append(icon);
    $(dom).append(iconContainer);
  }

  _createText(dom = this.dom) {
    $('<span class="text-box"></span>').text(this.options.label).appendTo(dom);
  }

  // look { @pipeline.js line48 }
  _createSteps(dom = this.dom) {
    const steps = $(`<div id="${this.actionId_stageId}"/>`)[0];
    steps.ref = this.actionId_stageId
    $(dom).append(steps);
  }

  parser = (response) => {
    return response.data
  }

  stageCallback = (result) => {
    document.getElementById(this.containerId).style.background = this.const.ColorMap.get(result)
    //this.container.css('background', this.const.ColorMap.get(result))
    if (result === this.const.StageStateCanceled || result === this.const.StageStateFailure || result === this.const.StageStateFinish) {
      this.stageE.kill()
    }
  }

  // actionCallback = (result) => {
  //   this.actionState = result
  //   if (result !== this.const.PipelineStateInit && result !== this.const.PipelineStateRunning) {
  //     this.actionE.kill()
  //   }
  // }

}

export default Stage
