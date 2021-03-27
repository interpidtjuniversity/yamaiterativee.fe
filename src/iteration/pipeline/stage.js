import { Node } from 'butterfly-dag';
import $ from'jquery';
import '../../static/css/iteration/pipeline/stage.css'
// import APIFetcher from "../../axios/task/APIFetcher";
// import TaskExecutor from "../../axios/task/TaskExecutor";

class Stage extends Node {
  constructor(opts) {
    super(opts);
    this.options = opts;
    this.stageId_execId = opts.stageId_execId;
    this.stageId = opts.stageId
    this.execId = opts.execId
  }

  draw(opts) {
    const container = $('<div class="schedule-base-node"></div>')
        .attr('id', opts.id)
        .css('top', opts.top + 'px')
        .css('left', opts.left + 'px')

    this._createTypeIcon(container);
    this._createText(container);
    this._createSteps(container);

    // save stage container ref so we can change bk_color when stage is hang or stage is successfully executed
    this.container = container;
    // let fetcher = new APIFetcher("/api/v1/iteration/ping", this.parser, this.callback)
    // this.e = new TaskExecutor(fetcher, 5000)

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
    const steps = $(`<div id="${this.stageId_execId}"/>`)[0];
    steps.ref = this.stageId_execId
    $(dom).append(steps);
  }

  parser = (response) => {
    return response.data
  }

  callback = (result) => {
    this.container.css('background', result.color)
  }
}

export default Stage
