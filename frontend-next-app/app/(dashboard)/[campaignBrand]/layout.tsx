import { cn } from "@/lib/utils";
import { Navbar } from ".././_components/Navbar";
import { Sidebar } from ".././_components/Sidebar";
import { headers } from "next/dist/client/components/headers";
const DashbaordLayout = ({children} : {children : React.ReactNode}) => {
    const headersList = headers();
    const pathname = headersList.get("x-pathname") || "";
    const isLandingPage = pathname === '/'
    
    return ( 
        <div className="h-full">
            {/* Navbar */}
            <div className="h-[80px] fixed inset-y-0 w-full z-50 md:pl-56">
                <Navbar />
            </div>

            {/* Sidebar */}
            <div className="hidden md:flex h-full w-56 flex-col fixed z-50 inset-y-0">
                <Sidebar />
            </div>

            {/* Dashboard */}
            <main className="md:pl-56">
                {children}
            </main>
        </div>
     );
}
 
export default DashbaordLayout;