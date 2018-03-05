import _WidgetBase = require("dijit/_WidgetBase");
import _TemplatedMixin = require("dijit/_TemplatedMixin");
import template = require("dojo/text!./templates/Label.html");

import declare from "../_utils/declareDecorator";

interface LabelParams {
  id: string
  handleLabelClick: (id: string) => void;
}

@declare(_WidgetBase, _TemplatedMixin)
export default class Label {
  params: LabelParams;
  templateString: string = template;
  label: HTMLElement;

  constructor(params: LabelParams, container: string | HTMLElement) {
    this.params = params;
  }

  private postCreate() {
    this.label.addEventListener("click", () => {
      this.params.handleLabelClick(this.params.id);
    });
  }
}