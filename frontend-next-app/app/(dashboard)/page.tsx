"use client"
import { useUser } from "@clerk/nextjs";
import { Logo } from "./_components/Logo";
import { BrandsMenu } from "./_components/brands-menu";

const brands = [
    {isAdmin: true, name:"Apple", brandId:"650b84714a8b6ead017af2ab"},
    {isAdmin: false, name:"Orange", brandId:"000000000000000000000001"},
    {isAdmin: false, name:"Banana", brandId:"000000000000000000000002"},
]

const Dashbaord = () => {
    const { user } = useUser()
    return ( 
    <div className="flex flex-col justify-center items-center p-32 md:p-36">
        <div className="p-8 shadow-2xl items-center flex flex-col gap-4">
            <Logo color="blue"/>
            <h1 className="text-xl text-center mt-6">
                Hey <span className="font-[600]">{user?.firstName}</span>, Which brand do you want to manage today?
            </h1>

            <div className="flex flex-row mt-4 gap-8 justify-center">
                {
                    brands && brands.map(brand => <BrandsMenu key={brand.brandId} isAdmin={brand.isAdmin} name={brand.name} brandId={brand.brandId}/>)
                }
            </div>
        </div>
    </div> );
}
 
export default Dashbaord;