"use client";

import { BarChart3, Compass, Layout, Megaphone, Settings } from "lucide-react";
import { SidebarItem } from "./sidebar-item";
const campaignBrand = '650b84714a8b6ead017af2ab'
const guestRoutes = [ 
    {
        icon: Megaphone,
        label: "Campaigns",
        href: `/${campaignBrand}/campaigns`
    },
    {
        icon: BarChart3,
        label: "Analyitcs",
        href: `/${campaignBrand}/analytics`
    },
    {
        icon: Settings,
        label: "Settings",
        href: `/settings`
    },
]


export const SidebarRoutes = () => {
    const routes = guestRoutes
    return ( 
        <div className="flex flex-col w-full">
            {
                routes.map(route => 
                    <SidebarItem
                        key={route.href}
                        icon={route.icon}
                        label={route.label}
                        href={route.href}
                    />
                )
            }
        </div>
     );
}
 