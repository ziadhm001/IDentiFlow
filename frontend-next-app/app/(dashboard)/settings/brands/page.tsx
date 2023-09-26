"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import toast from "react-hot-toast"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import Link from "next/link"
import { ConfirmModal } from "@/components/modals/confirm-modal"
import { Trash } from "lucide-react"

const brands : any[] = [
    {brandId: "123456789101213141516171", brandName: "Apple"}
]

const users : any[] = [
    {userId: "123456789101213141516171", userName: "Apple"}
]



const profileFormSchema = z.object({
    brand: z
    .string().min(24).max(24),
    user: z
    .string().min(24).max(24),
    createPermission: z
        .boolean({}),
    editPermission: z
        .boolean({}),
    deletePermission: z
        .boolean({}),
    })

type ProfileFormValues = z.infer<typeof profileFormSchema>

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {}

const BrandSettingsPage = () => {
    const [brand, setBrand] = useState(false)
    const [user, setUser] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues,
        mode: "onChange",
    })

    const removeUser = async () => {
        const data = form.getValues();
        setIsLoading(true)
        toast.custom(
            <pre className="mt-2 w-[340px] rounded-md bg-white p-4">
                <code className="text-slate-950">{JSON.stringify(data, null, 2)}</code>
            </pre>
        )
        setIsLoading(false)
    } 

    function onSubmit(data: ProfileFormValues) {
        toast.custom(
            <pre className="mt-2 w-[340px] rounded-md bg-white p-4">
                <code className="text-slate-950">{JSON.stringify(data, null, 2)}</code>
            </pre>
        )
    }

    return (
        <>
            <div>
                <h3 className="text-lg font-medium">Brands</h3>
                <p className="text-sm text-muted-foreground">
                    Here you can control your brands.
                </p>
            </div>
            <Separator className="my-4" />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="brand"
                        render={({ field }) => (
                            <FormItem className="p-2 px-4 border rounded-sm bg-slate-50">
                                <FormLabel>Select Brand</FormLabel>
                                <div className="flex gap-x-4 w-full">
                                    <Select onValueChange={(brandId) => {
                                        setBrand(true)
                                        field.onChange(brandId)
                                    }} 
                                    defaultValue={field.value}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a brand to configure" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                brands.length ?
                                                brands.map(brand => 
                                                    <SelectItem key={brand.brandId} value={`${brand.brandId}`}>{`${brand.brandName}`}</SelectItem>)
                                                    : <></>
                                                }
                                        </SelectContent>
                                    </Select>
                                    <Link href="/settings/brands/addbrand">
                                        <Button variant="add" className="w-48" type="button">Add Brand/Sub-brand</Button>
                                    </Link>
                                </div>
                                <FormDescription>
                                    Select the brand to interact with and configure.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )} />
                    {
                        brand ?
                        <FormField
                            control={form.control}
                            name="user"
                            render={({ field }) => (
                                <FormItem className="p-2 px-4 border rounded-sm bg-slate-50">
                                <FormLabel>Select User</FormLabel>
                                    <div className="flex gap-x-4 w-full">
                                        <Select onValueChange={(userId) => {
                                            setUser(true)
                                            field.onChange(userId)
                                        }} defaultValue={field.value}>
                                            <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a user to configure" />
                                            </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    users.length ?
                                                    users.map(user => 
                                                        <SelectItem key={user.userId} value={`${user.userId}`}>{`${user.userName}`}</SelectItem>)
                                                    : <></>
                                                }
                                            </SelectContent>
                                        </Select>
                                        <Link href="/settings/brands/adduser">
                                            <Button variant="add" className="w-48" type="button">Add User</Button>
                                        </Link>
                                    </div>
                                    <FormDescription>
                                        Select the user to interact with and configure.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            : <></>
                        }
                    {
                    user && brand ?
                    <>
                    <FormField
                        control={form.control}
                        name="createPermission"
                        render={({ field }) => (
                            <FormItem className="p-2 px-4 border rounded-sm bg-slate-100">
                                <FormLabel className="mr-2">Create Permission</FormLabel>
                                <FormControl>
                                    <Checkbox 
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Allow user to create campaigns.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )} />

                    <FormField
                        control={form.control}
                        name="editPermission"
                        render={({ field }) => (
                            <FormItem className="p-2 px-4 border rounded-sm bg-slate-100">
                                <FormLabel className="mr-2">Edit Permission</FormLabel>
                                <FormControl>
                                    <Checkbox 
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Allow user to edit campaigns.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )} />
                    <FormField
                        control={form.control}
                        name="deletePermission"
                        render={({ field }) => (
                            <FormItem className="p-2 px-4 border rounded-sm bg-slate-100">
                                <FormLabel className="mr-2">Delete Permission</FormLabel>
                                <FormControl>
                                    <Checkbox 
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Allow user to delete campaigns.
                                </FormDescription>
                                <FormMessage />
                                
                            </FormItem>
                        )} />
                        <Button className="mr-2" type="submit">Update</Button>
                        <ConfirmModal onConfirm={removeUser}>
                            <Button variant="outline" disabled={isLoading} type="button">
                                <Trash className="h-4 w-4 mr-2"/>
                                Remove User
                            </Button>
                        </ConfirmModal>
                        </>
                        : <></>
                    }
                </form>
            </Form>
        </>
    )
}

export default BrandSettingsPage