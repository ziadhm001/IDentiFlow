"use client"
import * as z from 'zod'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
    campaignName: z.string().min(1, {
        message: "Title is required",
    }),
})

interface TitleFormProps {
    initialData: {
        campaignId: string,
        campaignName: string, 
        campaignBrand: string, 
        campaignTarget: string[], 
        campaignDiscountValue: number, 
        isDiscountPercentage: boolean,
        isActive: boolean
    }
}

type FormSchema = z.infer<typeof formSchema>

export const TitleForm = ({initialData} : TitleFormProps) => {
    const router = useRouter()
    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            campaignName: initialData.campaignName
        }
    })
    const [ isEditing, setIsEditing] = useState(false)
    const { isSubmitting, isValid } = form.formState;

    const toggleEdit = () => {
        setIsEditing(current => !current)
    }

    const onSubmit = async (values: FormSchema) => {
        const data = initialData
        data.campaignName = values.campaignName
        try{
            axios.put('/api/campaigns', data).then(res =>{
                toggleEdit()
                toast.success('Campaign name updated successfully')
                router.refresh()
            })
        }
        catch{
            toast.error('Something wrong happend!')
        }
    }
    return (
        <div className='mt-6 border bg-slate-100 rounded-md p-4'>
            <div className='font-medium flex items-center justify-between'>
            <h1 className='font-bold'>Campaign title</h1>
                <Button variant="ghost" onClick={toggleEdit}>
                    {
                        isEditing ? 
                        (
                            <span>Cancel</span> 
                        ) : (
                            <>
                                <Pencil className='h-4 w-4 mr-2 ' />
                                <span>Edit title</span>
                            </>
                        )
                    }
                </Button>
            </div>
            {!isEditing ?
            (
            <p>{initialData.campaignName}</p>
            )
            :
            (
                <Form {...form}>
                    <form 
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-4 mt-4'
                    >
                        <FormField 
                            control={form.control} 
                            name='campaignName'
                            render={({ field } ) => 
                                <FormItem>
                                    <FormControl>
                                        <Input 
                                            disabled={isSubmitting}
                                            placeholder='e.g. Summer Education Discount'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }
                            />
                            <div className='flex items-center gap-x-2'>
                                <Button
                                    disabled={!isValid || isSubmitting}
                                    type='submit'
                                >
                                    Save
                                </Button>
                            </div>
                    </form>
                </Form>
            )    
        }
        </div>
    )
}