"use client"
import * as z from "zod";
import axios from 'axios'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
const validationSchema = z.object({
    campaignName: z.string().min(1, {
        message: "Campaign name is required."
    }),
});
type ValidationSchema = z.infer<typeof validationSchema>
const CreateCampaign = ({params} : {params : {campaignBrand: string}}) => {
    const { campaignBrand } = params
    const router = useRouter()
    const form = useForm<ValidationSchema>({
        resolver: zodResolver(validationSchema),
        defaultValues: {
            campaignName: "",
        }
    })

    const { isSubmitting, isValid } = form.formState
    const onSubmit = async (values: ValidationSchema) => {
        try{
            const response = await axios.post('/api/campaigns', {campaignName: values.campaignName, campaignBrand: campaignBrand});
            router.push(`/${campaignBrand}/campaigns/${response.data.data.campaignId}`)
            toast.success('Campaign created successfully')
            router.refresh()
        }
        catch(error : any){
            toast.error(error.message)
        }
    }
        return ( 
        <div className="flex max-w-max mx-auto p-16 items-center">
            <div className="flex flex-col max-h-max p-6 justify-center shadow-xl border border-slate-100">
                <h1>
                    Name your campagin
                </h1>
                <p className="text-sm text-slate-600">
                    What would you like to name your campaign?
                </p>
                <Form {...form}>
                    <form 
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 mt-8"
                    >
                        <FormField 
                            control={form.control}
                            name="campaignName"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Campaign name</FormLabel>
                                    <FormControl>
                                        <Input 
                                            disabled={isSubmitting}
                                            placeholder="e.g. 'Apple students festival campaign'"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Why are you creating this campaign?
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Link href={`/${campaignBrand}/campaigns`}>
                                <Button type="button" variant="ghost">
                                    Cancel
                                </Button>
                            </Link>
                            <Button type="submit" disabled={!isValid || isSubmitting}>
                                    Continue
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
     );
}
 
export default CreateCampaign;