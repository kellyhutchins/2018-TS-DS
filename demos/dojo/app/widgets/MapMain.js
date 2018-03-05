var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dojo/text!./templates/MapMain.html", "esri/WebScene", "esri/views/SceneView", "../_utils/declareDecorator"], function (require, exports, _WidgetBase, _TemplatedMixin, template, WebScene, SceneView, declareDecorator_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MapMain = /** @class */ (function () {
        function MapMain(params, container) {
            this.templateString = template;
            this.hiddenBuildings = [];
            this.params = params;
        }
        MapMain.prototype.unhideBuilding = function (id) {
            this.hiddenBuildings.splice(this.hiddenBuildings.indexOf(id), 1);
            this.updateDefinitionExpression();
            this.params.updateSidePanel(this.hiddenBuildings);
        };
        MapMain.prototype.unhideAllBuildings = function () {
            this.hiddenBuildings = [];
            this.updateDefinitionExpression();
            this.params.updateSidePanel(this.hiddenBuildings);
        };
        MapMain.prototype.postCreate = function () {
            var _this = this;
            var webscene = new WebScene({
                portalItem: {
                    id: "10ede348e4c54c77b45f6ebab2d018db"
                }
            });
            var view = new SceneView({
                container: this.mapContainer,
                map: webscene
            });
            webscene.when(function () {
                _this.sceneLayer = webscene.layers.find(function (l) {
                    return l.title === "Buildings";
                });
                view.on("click", function (event) {
                    view.hitTest(event)
                        .then(function (response) {
                        var graphic = response.results[0].graphic;
                        // check if a graphic is returned from the hitTest
                        // and that it belongs to the Buildings layer
                        if (graphic && graphic.layer.title === "Buildings") {
                            // function that hides the building the user clicked on
                            _this.hideBuilding(graphic.attributes.OBJECTID);
                        }
                    });
                });
            });
        };
        MapMain.prototype.hideBuilding = function (id) {
            this.hiddenBuildings.push(id);
            this.updateDefinitionExpression();
            this.params.updateSidePanel(this.hiddenBuildings);
        };
        MapMain.prototype.updateDefinitionExpression = function () {
            var expr;
            if (this.hiddenBuildings.length > 0) {
                expr = "OBJECTID NOT IN (" + this.hiddenBuildings.join(",") + ")";
            }
            else {
                expr = "";
            }
            this.sceneLayer.set("definitionExpression", expr);
        };
        MapMain = __decorate([
            declareDecorator_1.default(_WidgetBase, _TemplatedMixin)
        ], MapMain);
        return MapMain;
    }());
    exports.default = MapMain;
});
