import { Node } from 'butterfly-dag';
import React from "react";
import $ from'jquery';
import '../../static/css/iteration/pipeline/stage.css'

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

}

export default Stage
