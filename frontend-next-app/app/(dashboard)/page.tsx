"use client"
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { Braces, User } from "lucide-react";
import Link from "next/link";
import { Logo } from "./_components/Logo";

const Dashbaord = () => {
    const { user } = useUser()
    return ( 
    <div className="flex flex-col justify-center items-center p-32 md:p-36">
        <div className="p-8 shadow-2xl items-center flex flex-col gap-4">
            <Logo color="blue"/>
            <h1 className="text-2xl text-center mt-6">
                Hey <span className="font-[600]">{user?.firstName}</span>, Welcome Back
            </h1>
            <div className="flex flex-row mt-4 gap-8 justify-center">
                <Link href="/admin/campaigns">
                    <Button className="gap-2" size="lg">
                        <Braces />
                        Admin Mode
                    </Button>
                </Link>
                <Link href="/staff/campaigns">
                    <Button variant="ghost" className="gap-2" size="lg">
                        <User />
                        Staff Mode
                    </Button>
                </Link>
            </div>
        </div>
        
    </div> );
}
 
export default Dashbaord;