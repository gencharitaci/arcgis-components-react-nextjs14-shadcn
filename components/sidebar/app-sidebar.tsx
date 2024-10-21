"use client";

import { Command } from "lucide-react";
import { NavUser } from "@/components/nav/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader, SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
    useSidebar
} from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ArcgisAreaMeasurement2d, ArcgisBasemapGallery, ArcgisBasemapLayerList, ArcgisBookmarks, ArcgisDistanceMeasurement2d, ArcgisEditor, ArcgisLayerList, ArcgisLegend, ArcgisPrint, ArcgisSketch } from "@arcgis/map-components-react";
import { Fragment, useState } from "react";

import { menuItems, user } from "@/lib/nav";
import { Logo } from "@/components/logo/logo";
import { Button } from "../ui/button";


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const [activeComponent, setActiveComponent] = useState<string>("layer-list");
    const { setOpen } = useSidebar();

    const renderComponent = () => {
        switch (activeComponent) {
            case "layer-list":
                return (
                    <>
                        <ArcgisLayerList
                            reference-element="viewDiv"
                            drag-enabled
                            selection-mode="multiple"
                            position="bottom-left">
                        </ArcgisLayerList>
                        <ArcgisLegend reference-element="#viewDiv" />

                        <ArcgisBasemapLayerList
                            reference-element="#viewDiv"
                            hideHeading={true}
                            collapsed={true}
                        />

                    </>

                )
            case "measurements":
                return (
                    <Tabs defaultValue="area" className="w-[420px]">
                        <TabsList>
                            <TabsTrigger value="area">Area Measurement (2D)</TabsTrigger>
                            <TabsTrigger value="distance">Distance Measurement (2D)</TabsTrigger>
                        </TabsList>
                        <TabsContent value="area">
                            <ArcgisAreaMeasurement2d
                                reference-element="#viewDiv"
                                position="top-left"
                            />
                        </TabsContent>
                        <TabsContent value="distance">
                            <ArcgisDistanceMeasurement2d
                                reference-element="#viewDiv"
                                position="top-left"
                            />
                        </TabsContent>
                    </Tabs>
                );
            case "basemaps":
                return (
                    <ArcgisBasemapGallery reference-element="#viewDiv" />
                )
            case "editor":
                return (
                    <ArcgisEditor
                        onArcgisPropertyChange={(event) => { console.log("ArcgisEditor property change", event); }}
                        reference-element="#viewDiv"
                    >
                    </ArcgisEditor>
                )
            case "bookmarks":
                return <ArcgisBookmarks reference-element="#viewDiv" showFilter={true} showAddBookmarkButton={true} showEditBookmarkButton={true}></ArcgisBookmarks>
            case "sketch":
                return <ArcgisSketch reference-element="#viewDiv" creation-mode="continuous"
                    layout="horizontal"></ArcgisSketch>;
            case "print":
                return <ArcgisPrint reference-element="#viewDiv" include-default-templates="false"
                    allowed-formats="all" allowed-layouts="all"></ArcgisPrint>;
            default:
                return <div>Select a tool from the sidebar</div>;
        }
    };

    return (
        <Sidebar
            collapsible="icon"
            className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
            {...props}
        >
            {/* This is the first sidebar */}
            <Sidebar
                collapsible="none"
                className="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-r bg-gradient-to-tr from-slate-400 to-stone-500"
            >
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                                <a href="#">
                                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                        <Command className="size-4" />
                                    </div>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">Acme Inc</span>
                                        <span className="truncate text-xs">Enterprise</span>
                                    </div>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>
                <SidebarSeparator className="my-2" />
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent className="px-1.5 md:px-0">
                            <SidebarMenu>
                                {menuItems.map((item, index) => (
                                    <Fragment key={item.title || index}> {/* Key on the outer fragment */}
                                        <SidebarMenuItem>
                                            <SidebarMenuButton
                                                tooltip={{
                                                    children: item.title,
                                                    hidden: false,
                                                }}
                                                onClick={() => {
                                                    setActiveComponent(item.component); // Set active component based on the menu item clicked
                                                    setOpen(true);
                                                }}
                                                className="px-1.5 md:px-2"
                                                isActive={activeComponent === item.component}
                                            >
                                                {/* Icon and title */}
                                                <div className="flex aspect-square size-5 items-center justify-center rounded-lg">
                                                    {<item.icon className="size-6" absoluteStrokeWidth />}
                                                </div>
                                                <span>{item.title}</span>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                        <SidebarSeparator className="my-1" />
                                    </Fragment>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                    <NavUser user={user} />
                </SidebarFooter>
            </Sidebar>

            {/* This is the second sidebar */}
            <Sidebar
                collapsible="none"
                className="hidden flex-1 md:flex bg-gradient-to-tr from-slate-400 to-stone-500">
                <Logo />
                <SidebarHeader className="gap-3.5 border-b p-4">
                    <div className="flex w-full items-center justify-between">
                        <Button variant="outline" className="text-lg font-medium text-foreground">
                            {menuItems.find(item => item.component === activeComponent)?.title || "Menu"}
                        </Button>
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup className="px-0">
                        <SidebarGroupContent>
                            {/* Dynamically render content based on the active menu item */}
                            {renderComponent()}
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
        </Sidebar>
    );
}
