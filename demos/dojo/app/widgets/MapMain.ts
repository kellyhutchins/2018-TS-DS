import _WidgetBase = require("dijit/_WidgetBase");
import _TemplatedMixin = require("dijit/_TemplatedMixin");
import template = require("dojo/text!./templates/MapMain.html");

import WebScene = require("esri/WebScene");
import SceneView = require("esri/views/SceneView");
import SceneLayer = require("esri/layers/SceneLayer");

import declare from "../_utils/declareDecorator";

interface MapMainParams {
  updateSidePanel: (hiddenBuildings: string[]) => void;
}

@declare(_WidgetBase, _TemplatedMixin)
export default class MapMain {
  params: MapMainParams;
  templateString: string = template;
  mapContainer: HTMLElement;
  hiddenBuildings: string[] = [];
  sceneLayer: __esri.Layer;

  constructor(params: MapMainParams, container: string | HTMLElement) {
    this.params = params;
  }

  public unhideBuilding(id: string) {
    this.hiddenBuildings.splice(this.hiddenBuildings.indexOf(id), 1);
    this.updateDefinitionExpression();
    this.params.updateSidePanel(this.hiddenBuildings);
  }

  public unhideAllBuildings() {
    this.hiddenBuildings = [];
    this.updateDefinitionExpression();
    this.params.updateSidePanel(this.hiddenBuildings);
  }

  private postCreate() {
    const webscene = new WebScene({
      portalItem: {
        id: "10ede348e4c54c77b45f6ebab2d018db"
      }
    });

    const view = new SceneView({
      container: this.mapContainer as HTMLDivElement,
      map: webscene
    });

    webscene.when(() => {
      this.sceneLayer = webscene.layers.find(function(l) {
        return l.title === "Buildings";
      });

      view.on("click", (event) => {
        view.hitTest(event)
          .then((response) => {

            var graphic = response.results[0].graphic;

            // check if a graphic is returned from the hitTest
            // and that it belongs to the Buildings layer
            if (graphic && graphic.layer.title === "Buildings") {

              // function that hides the building the user clicked on
              this.hideBuilding(graphic.attributes.OBJECTID);
            }
          });
      });
    });
  }

  private hideBuilding(id: string) {
    this.hiddenBuildings.push(id);
    this.updateDefinitionExpression();
    this.params.updateSidePanel(this.hiddenBuildings);
  }

  private updateDefinitionExpression() {
    let expr;
    if (this.hiddenBuildings.length > 0) {
      expr = `OBJECTID NOT IN (${this.hiddenBuildings.join(",")})`;
    } else {
      expr = "";
    }
    this.sceneLayer.set("definitionExpression", expr);
  }
}