"use client";

import { BarChart3, Compass, Layout, Megaphone, Settings } from "lucide-react";
import { SidebarItem } from "./sidebar-item";

const guestRoutes = [ 
    {
        icon: Megaphone,
        label: "Campaigns",
        href: "/admin/campaigns"
    },
    {
        icon: BarChart3,
        label: "Analyitcs",
        href: "/admin/analytics"
    },
    {
        icon: Settings,
        label: "Settings",
        href: "/admin/settings"
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
 