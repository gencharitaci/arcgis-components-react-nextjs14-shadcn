import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

import dynamic from 'next/dynamic'
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { ArcgisHome, ArcgisLocate, ArcgisNavigationToggle, ArcgisZoom } from "@arcgis/map-components-react/dist/components";

const DynamicMapNoSSR = dynamic(() => import('@/components/map/map'), {
  ssr: false,
});

const DynamicScatterplotNoSSR = dynamic(() => import('@/components/charts/Scatterplot'), {
  ssr: false,
});

// Define props interface
interface ResizablePanelProps {
  defaultLayout?: number[];
}


export default function ResizablePanelLayout({ defaultLayout }: ResizablePanelProps) {
  const [, setLayout] = useState(defaultLayout);

  useEffect(() => {
    const layoutFromCookies = Cookies.get("react-resizable-panels:layout");
    const parseJSON = (value: string) => {
      try {
        return JSON.parse(value);
      } catch (e) {
        console.error("Failed to parse JSON:", e);
        return undefined;
      }
    };

    setLayout(layoutFromCookies ? parseJSON(layoutFromCookies) : defaultLayout);

    document.body.classList.add("no-scroll");

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [defaultLayout]);


  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={50}>
        <DynamicMapNoSSR />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <div className="inline-block align-middle">
        <ArcgisHome reference-element="#viewDiv"></ArcgisHome>
        <ArcgisZoom reference-element="#viewDiv"></ArcgisZoom>
        <ArcgisLocate reference-element="#viewDiv"></ArcgisLocate>
        <ArcgisNavigationToggle reference-element="#viewDiv"></ArcgisNavigationToggle>
      </div>
      <ResizableHandle />
      <ResizablePanel className="aspect-video w-full" defaultSize={50}>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-1">
            <DynamicScatterplotNoSSR />
          </div>
          <div className="min-h-[h-full] flex-1 rounded-xl bg-muted/50 md:min-h-min">
            Content
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
