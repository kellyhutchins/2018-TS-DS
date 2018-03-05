var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dojo/text!./templates/AppBody.html", "../_utils/declareDecorator", "./MapMain", "./Label"], function (require, exports, _WidgetBase, _TemplatedMixin, template, declareDecorator_1, MapMain_1, Label_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AppBody = /** @class */ (function () {
        function AppBody(params, container) {
            this.templateString = template;
            this.labelWidgets = {};
            this.params = params;
            this.updateSidePanel = this.updateSidePanel.bind(this);
            this.handleLabelClick = this.handleLabelClick.bind(this);
        }
        AppBody.prototype.postCreate = function () {
            var _this = this;
            this.mapMain = new MapMain_1.default({
                updateSidePanel: this.updateSidePanel
            }, this.mapMainContainer);
            this.unmaskAllBtn.addEventListener("click", function () {
                _this.mapMain.unhideAllBuildings();
            });
        };
        AppBody.prototype.updateSidePanel = function (hiddenBuildings) {
            var _this = this;
            if (hiddenBuildings.length > 0) {
                this.unmaskAllBtn.style.display = "block";
            }
            else {
                this.unmaskAllBtn.style.display = "none";
            }
            Object.keys(this.labelWidgets).forEach(function (id) {
                if (hiddenBuildings.indexOf(id) < 0) {
                    _this.labelWidgets[id]["destroy"]();
                    delete _this.labelWidgets[id];
                }
            });
            hiddenBuildings
                .filter(function (id) { return !_this.labelWidgets[id]; })
                .forEach(function (id) {
                var widgetNode = document.createElement("div");
                _this.labelContainer.appendChild(widgetNode);
                _this.labelWidgets[id] = new Label_1.default({
                    id: id,
                    handleLabelClick: _this.handleLabelClick
                }, widgetNode);
            });
        };
        AppBody.prototype.handleLabelClick = function (id) {
            this.mapMain.unhideBuilding(id);
        };
        AppBody = __decorate([
            declareDecorator_1.default(_WidgetBase, _TemplatedMixin)
        ], AppBody);
        return AppBody;
    }());
    exports.default = AppBody;
});
