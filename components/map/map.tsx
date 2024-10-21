import "@/styles/map.module.css";
import { ArcgisMap, ArcgisScaleBar, ArcgisSearch } from '@arcgis/map-components-react';

// import defineCustomElements to register custom elements with the custom elements registry
import { defineCustomElements as defineMapElements } from "@arcgis/map-components/dist/loader";
defineMapElements(window, { resourcesUrl: "https://js.arcgis.com/map-components/4.30/assets" });


export default function Map() {
    return (
        <ArcgisMap
            id={"viewDiv"}
            // itemId="e0ffe4fa99aa42eeac564cafa297d60a"
            itemId={"459a495fc16d4d4caa35e92e895694c8"}
            popupDisabled={false}
        >
            <ArcgisSearch position="top-right"></ArcgisSearch>
            <ArcgisScaleBar position="bottom-left" bar-style="ruler"
                unit="imperial" ></ArcgisScaleBar>
        </ArcgisMap>
    )
}
