import { cn } from "@/lib/utils";
import { Navbar } from "./_components/Navbar";
import { Sidebar } from "./_components/Sidebar";
import { headers } from "next/dist/client/components/headers";
const DashbaordLayout = ({children} : {children : React.ReactNode}) => {
    const headersList = headers();
    const pathname = headersList.get("x-pathname") || "";
    console.log(pathname);
    const isLandingPage = pathname === '/'
    
    return ( 
        <div className="h-full">
            {/* Navbar */}
            <div className="h-[80px] fixed inset-y-0 w-full z-50">
                <Navbar />
            </div>

            {/* Dashboard */}
            <main className="pt-[80px]">
                {children}
            </main>
        </div>
     );
}
 
export default DashbaordLayout;