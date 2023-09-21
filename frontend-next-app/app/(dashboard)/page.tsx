"use client"
import { Button } from "@/components/ui/button";
import { UserButton, auth, useUser } from "@clerk/nextjs";
import { Braces, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Dashbaord = () => {
    const { user } = useUser()
    return ( 
    <div className="flex flex-col justify-center items-center p-32 md:p-36">
        <div className="p-8 shadow-lg">
            <h1 className="text-3xl text-center">
                Hey <span className="font-[600]">{user?.firstName}</span>, Welcome Back to XYZ!
            </h1>
            <div className="flex flex-row mt-4 gap-8 justify-center">
                <Link href="/admin/campaigns">
                    <Button className="gap-2" size="lg">
                        <Braces />
                        Admin Mode
                    </Button>
                </Link>
                <Link href="/staff/campaigns">
                    <Button className="gap-2" size="lg">
                        <User />
                        Staff Mode
                    </Button>
                </Link>
            </div>
        </div>
        
    </div> );
}
 
export default Dashbaord;