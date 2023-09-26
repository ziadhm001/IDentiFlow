import { NavbarRoutes } from "@/components/navbar-routes"
import { MobileSideBar } from "./mobile-sidebar"
import { Logo } from "./Logo"

export const Navbar = () => {
    return (
        <div className="p-4 border-b h-full flex items-center bg-white shadow-sm px-10">
            <MobileSideBar />
            <NavbarRoutes />
        </div>
    )
}