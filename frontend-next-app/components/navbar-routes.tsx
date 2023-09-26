"use client";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Braces, User, User2Icon, UserCheck, UserX } from "lucide-react";
import Link from "next/link";
import { UserProfile } from "@/components/user-profile";

export const NavbarRoutes = () => {
    const pathname = usePathname()
    const isAdminPage = pathname?.includes("/admin")
    const isLandingPage = pathname === '/'
    return (
        <div className="flex gap-x-2 ml-auto">
            <UserProfile />
        </div>
    )
}