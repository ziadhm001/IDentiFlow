import { cn } from "@/lib/utils";
import { Navbar } from "./_components/Navbar";
import { Sidebar } from "./_components/Sidebar";
import { usePathname } from "next/navigation";
import { headers } from "next/dist/client/components/headers";
import { auth } from "@clerk/nextjs";
const DashbaordLayout = ({children} : {children : React.ReactNode}) => {
    const headersList = headers();
    const pathname = headersList.get("x-invoke-path") || "";

    console.log(pathname);
    const isLandingPage = pathname === '/'
    
    return ( 
        <div className="h-full">
            {/* Navbar */}
            <div className={cn("h-[80px] fixed inset-y-0 w-full z-50", !isLandingPage && "md:pl-56")}>
                <Navbar />
            </div>

            {/* Sidebar */}
            {
                !isLandingPage ?
                    <div className="hidden md:flex h-full w-56 flex-col fixed z-50 inset-y-0">
                        <Sidebar />
                    </div>
                : <></>
            }

            {/* Dashboard */}
            <main className={cn("pt-[80px]", !isLandingPage && "md:pl-56")}>
                {children}
            </main>
        </div>
     );
}
 
export default DashbaordLayout;