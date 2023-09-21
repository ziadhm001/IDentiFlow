"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Braces, User, User2Icon, UserCheck, UserX } from "lucide-react";
import Link from "next/link";
import path from "path";

export const NavbarRoutes = () => {
    const pathname = usePathname()
    const router = useRouter()

    const isAdminPage = pathname?.includes("/admin")
    const isLandingPage = pathname === '/'
    return (
        <div className="flex gap-x-2 ml-auto">
            {
                isAdminPage ? (
                    <Link href={`${pathname.replace('admin','staff')}`}>
                        <Button className="gap-x-1" variant="ghost" size="sm">
                            <User />
                            Switch to Staff Mode
                        </Button>
                    </Link>
                )
                : !isLandingPage ? (
                    <Link href={`${pathname.replace('staff','admin')}`}>
                        <Button className="gap-x-1" variant="ghost" size="sm">
                            <Braces />
                            Switch to Admin Mode
                        </Button>
                    </Link>
                )
                : <></>
            }
            <UserButton />
        </div>
    )
}