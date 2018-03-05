var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dojo/text!./templates/Label.html", "../_utils/declareDecorator"], function (require, exports, _WidgetBase, _TemplatedMixin, template, declareDecorator_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Label = /** @class */ (function () {
        function Label(params, container) {
            this.templateString = template;
            this.params = params;
        }
        Label.prototype.postCreate = function () {
            var _this = this;
            this.label.addEventListener("click", function () {
                _this.params.handleLabelClick(_this.params.id);
            });
        };
        Label = __decorate([
            declareDecorator_1.default(_WidgetBase, _TemplatedMixin)
        ], Label);
        return Label;
    }());
    exports.default = Label;
});
