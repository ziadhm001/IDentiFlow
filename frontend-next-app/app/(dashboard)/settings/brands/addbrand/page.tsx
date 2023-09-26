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

const brands : any[] = [
    {brandId: "123456789101213141516171", brandName: "Apple"}
]

const users : any[] = [
    {userId: "123456789101213141516171", userName: "Apple"}
]



const profileFormSchema = z.object({
    rootBrand: z
    .string().min(24).max(24).optional(),
    name: z
    .string().min(1).max(24)
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {}

const AddBrandPage = () => {
    const [brand, setBrand] = useState(false)
 
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues,
        mode: "onChange",
    })

    const { isSubmitting } = form.formState;

    function onSubmit(data: ProfileFormValues) {
        data.rootBrand === "000000000000000000000000" ? delete data.rootBrand : <></>
        toast.custom(
            <pre className="mt-2 w-[340px] rounded-md bg-white p-4">
                <code className="text-slate-950">{JSON.stringify(data, null, 2)}</code>
            </pre>
        )
    }

    return (
        <>
            <div>
                <h3 className="text-lg font-medium">Add Brand/Sub-brand</h3>
                <p className="text-sm text-muted-foreground">
                    Here you can add a new brand or sub-brand
                </p>
            </div>
            <Separator className="my-4" />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="rootBrand"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Select Root Brand</FormLabel>
                                    <Select onValueChange={(brandId) => {
                                        setBrand(true)
                                        field.onChange(brandId)
                                    }} 
                                    defaultValue={field.value}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select the root brand.." />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="000000000000000000000000">This is a new root brand</SelectItem>
                                            {
                                                brands.length ?
                                                brands.map(brand => 
                                                    <SelectItem key={brand.brandId} value={`${brand.brandId}`}>{`${brand.brandName}`}</SelectItem>)
                                                    : <></>
                                                }
                                        </SelectContent>
                                    </Select>
                                <FormDescription>
                                    Select the root brand, this option is for sub-brands only.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )} />
                    {
                        brand ?
                        <FormField 
                            control={form.control} 
                            name='name'
                            render={({ field } ) => 
                                <FormItem>
                                    <FormLabel>Brand name</FormLabel>
                                    <FormControl>
                                        <Input 
                                            disabled={isSubmitting}
                                            placeholder='e.g. Zara Fashion'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }
                            />
                            : <></>
                        }
                    <Button type="submit">New Brand</Button>
                </form>
            </Form>
        </>
    )
}

export default AddBrandPage