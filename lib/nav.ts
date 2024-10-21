import { Bookmark, LandPlot, Printer, Layers, DraftingCompass, Map, Edit } from "lucide-react";

export const menuItems = [
    {
        title: "Layer List",
        component: "layer-list",
        icon: Layers,
    },
    {
        title: "Basemaps",
        component: "basemaps",
        icon: Map,
    },
    {
        title: "Bookmarks",
        component: "bookmarks",
        icon: Bookmark,
    },
    {
        title: "Measurements",
        component: "measurements",
        icon: LandPlot,
    },
    {
        title: "Print",
        component: "print",
        icon: Printer,
    },
    {
        title: "Sketch",
        component: "sketch",
        icon: DraftingCompass,
    },
    {
        title: "Editor",
        component: "editor",
        icon: Edit,
    },
];

export const user = {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
};