import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { LogOut, Settings } from "lucide-react"
const brands = [
    {brandId: "123", brandName: "Apple"},
    {brandId: "456", brandName: "Zara"},
    {brandId: "789", brandName: "Ikea"},
]
const userData = {email: "ziadhazemdesoky@gmail.com", firstName: "Ziad", lastName: "Hazem"}
export const UserProfile = () => {
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                        <Avatar className="h-10 w-10">
                            <AvatarFallback>{userData.firstName.charAt(0)+userData.lastName.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{userData.firstName + " " + userData.lastName}</p>
                            <p className="text-xs leading-none text-muted-foreground">
                                {userData.email}
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                    {
                        brands ? brands.map(brand => 
                            <Link key={brand.brandId} href={`/${brand.brandId}/campaigns`}>
                                <DropdownMenuItem>
                                {brand.brandName}
                                </DropdownMenuItem>
                            </Link>
                            )
                        : <p className="ml-2 text-xs">No brands yet.</p>
                    }
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <Link className="flex flex-row" href="/settings">
                        <DropdownMenuItem>
                                <Settings className="w-4 h-4 mr-2"/>
                                Settings
                        </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem>
                        <LogOut className="w-4 h-4 mr-2"/>
                        Log out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}