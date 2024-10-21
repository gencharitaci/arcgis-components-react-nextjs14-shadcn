import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import WebMap from "@arcgis/core/WebMap";

/**
 * Create a feature layer with a service URL. This will be used to create a chart later.
 */
export async function createFeatureLayer(url: string): Promise<FeatureLayer> {
  const featureLayer = new FeatureLayer({
    url: url
  });

  await featureLayer.load();

  return featureLayer;
}


export async function loadData() {
  const webMap = new WebMap({
    portalItem: { id: "93d14bfd59a84af0be99a883feba052b" },
  });
  await webMap.loadAll();

  const featureLayer = webMap.findLayerById("17c807fd286-layer-47") as FeatureLayer;

  const featureSet = await featureLayer.queryFeatures({
    where: "1=1",
    outFields: ["*"],
    returnGeometry: true,
  });

  return { webMap, featureLayer, featureSet };

  
}