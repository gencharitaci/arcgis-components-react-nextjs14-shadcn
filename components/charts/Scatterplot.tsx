"use client";

import styles from "@/styles/charts.module.css"
import { useEffect, useRef, useCallback } from "react";
import { ArcgisChartsActionBar, ArcgisChartsScatterPlot } from "@arcgis/charts-components-react";
import { ScatterPlotModel } from "@arcgis/charts-model";
import { createFeatureLayer } from "@/lib/layers";

// Define the type for the scatterplot ref
type ScatterPlotElement = HTMLArcgisChartsScatterPlotElement;

// define custom elements in the browser, and load the assets from the CDN
import { defineCustomElements as defineChartsElements } from '@arcgis/charts-components/dist/loader';
defineChartsElements(window, { resourcesUrl: 'https://js.arcgis.com/charts-components/4.30/t9n' });


export default function Scatterplot() {
  // Use the correct type for the scatterplotRef
  const scatterplotRef = useRef<ScatterPlotElement>(null);

  // useCallback to prevent the function from being recreated when the component rebuilds
  const initScatterplot = useCallback(async () => {
    const layer = await createFeatureLayer(
      "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/ChicagoCr/FeatureServer/0",
    );

    // Create a new ScatterPlotModel and set the x and y axis fields.
    const scatterplotModel = new ScatterPlotModel();
    await scatterplotModel.setup({ layer });

    await scatterplotModel.setXAxisField("Ward");
    await scatterplotModel.setYAxisField("Beat");

    // Set the scatterplot element's config and layer properties, if the ref is not null
    const config = scatterplotModel.getConfig();

    if (scatterplotRef.current) {
      scatterplotRef.current.config = config;
      scatterplotRef.current.layer = layer;

      // Add event listener when selection is made on the chart to enable/disable action bar buttons.
      scatterplotRef.current.addEventListener(
        "arcgisChartsSelectionComplete",
        (event: CustomEvent) => {
          const actionBarElement = document.getElementById(
            "scatterplot-action-bar",
          ) as HTMLArcgisChartsActionBarElement;

          const selectionData = event.detail;
          if (!selectionData.selectionOIDs || selectionData.selectionOIDs.length === 0) {
            actionBarElement.clearSelectionState = "disabled";
            actionBarElement.filterBySelectionState = "disabled";
          } else {
            actionBarElement.clearSelectionState = "enabled";
            actionBarElement.filterBySelectionState = "enabled";
          }
        },
      );
    }
  }, []);

  // Register a function that will execute after the current render cycle
  useEffect(() => {
    initScatterplot().catch(console.error);
  }, [initScatterplot]);

  return (
    <ArcgisChartsScatterPlot ref={scatterplotRef} className={styles['chart-component']} id="scatteplot">
      <ArcgisChartsActionBar slot="action-bar" id="scatterplot-action-bar"></ArcgisChartsActionBar>
    </ArcgisChartsScatterPlot>
  );
}
