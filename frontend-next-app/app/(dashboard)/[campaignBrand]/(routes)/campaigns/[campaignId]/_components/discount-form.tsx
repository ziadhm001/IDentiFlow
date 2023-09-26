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
import { Combobox } from '@/components/ui/combobox'

const formSchema = z.object({
    campaignDiscountValue: z.string(),
    isDiscountPercentage: z.boolean()
})

interface DiscountFormProps {
    initialData: {
        campaignId: string,
        campaignName: string, 
        campaignBrand: string, 
        campaignTarget: string[], 
        campaignDiscountValue: number, 
        isDiscountPercentage: boolean,
        isActive: boolean,
    }
}

type FormSchema = z.infer<typeof formSchema>

export const DiscountForm = ({initialData} : DiscountFormProps) => {
    const router = useRouter()
    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            campaignDiscountValue: initialData.campaignDiscountValue?.toString(),
            isDiscountPercentage: initialData.isDiscountPercentage,
        }
    })
    const [ isEditing, setIsEditing] = useState(false)
    const { isSubmitting, isValid } = form.formState;

    const toggleEdit = () => {
        setIsEditing(current => !current)
    }

    const onSubmit = async (values: FormSchema) => {
        const data = initialData
        data.campaignDiscountValue = parseFloat(values.campaignDiscountValue)
        data.isDiscountPercentage = values.isDiscountPercentage
        try{
            axios.put('/api/campaigns', data).then(res =>{
                toggleEdit()
                toast.success('Campaign discount updated successfully')
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
            <h1 className='font-bold'>Discount</h1>
                <Button variant="ghost" onClick={toggleEdit}>
                    {
                        isEditing ? 
                        (
                            <span>Cancel</span> 
                        ) : (
                            <>
                                <Pencil className='h-4 w-4 mr-2 ' />
                                <span>Edit discount</span>
                            </>
                        )
                    }
                </Button>
            </div>
            {!isEditing ?
            (
                initialData.campaignDiscountValue ?
                <p className='text-slate-500 mt-2'>{`${initialData.isDiscountPercentage ? "%" : "$"} ${initialData.campaignDiscountValue}`}</p>
                :
                <p className='text-slate-500 mt-2 italic'>No discount set.</p>
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
                            name='campaignDiscountValue'
                            render={({ field } ) => 
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type='number'
                                            max={initialData.isDiscountPercentage ? 100 : Infinity}
                                            disabled={isSubmitting}
                                            placeholder='e.g. 20'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }
                        />
                        <FormField 
                            control={form.control} 
                            name='isDiscountPercentage'
                            render={({ field } ) => 
                                <FormItem>
                                    <FormControl>
                                        <Combobox 
                                            options={[{label: '%', value: true}, {label: '$', value: false}]}
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