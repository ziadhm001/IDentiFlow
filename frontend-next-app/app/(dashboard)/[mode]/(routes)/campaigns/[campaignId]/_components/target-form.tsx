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
import { Checkbox } from '@/components/ui/checkbox'

const formSchema = z.object({
    campaignTarget: z.array(z.string())
})

interface TargetFormProps {
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

export const TargetForm = ({ initialData }: TargetFormProps) => {
    const router = useRouter()
    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            campaignTarget: initialData.campaignTarget
        }
    })
    const [hasChecked, setHasChecked] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const { isSubmitting, isValid } = form.formState;

    const toggleEdit = () => {
        setIsEditing(current => !current)
    }

    const onSubmit = async (values: FormSchema) => {
        const data = initialData
        console.log(data)
        try {
            axios.put('/api/campaigns', data).then(res => {
                toggleEdit()
                toast.success('Campaign targets updated successfully')
                router.refresh()
            })
        }
        catch {
            toast.error('Something wrong happend!')
        }
    }
    return (
        <div className='mt-6 border bg-slate-100 rounded-md p-4'>
            <div className='font-medium flex items-center justify-between'>
                <h1 className='font-bold'>Campaign targets</h1>
                <Button variant="ghost" onClick={toggleEdit}>
                    {
                        isEditing ?
                            (
                                <span>Cancel</span>
                            ) : (
                                <>
                                    <Pencil className='h-4 w-4 mr-2 ' />
                                    <span>Edit targets</span>
                                </>
                            )
                    }
                </Button>
            </div>
            {!isEditing ?
                <div className='mt-2 grid grid-cols-2 md:grid-cols-3 gap-3'>
                {
                    initialData.campaignTarget.length === 0 
                        ? <p className='text-slate-500 italic'>No current targets</p> 
                        : initialData.campaignTarget.map((target) => (
                        <div key={target}>
                            <Checkbox disabled={true} checked={true} id={target} className='mr-2' />
                            <label htmlFor={target}>{target}</label>
                        </div>
                        ))
                }
                </div>
                :
                (
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='space-y-4 mt-4'
                        >
                            <FormField
                                control={form.control}
                                name='campaignTarget'
                                render={({ field }) =>
                                <div className='grid grid-cols-2 gap-3'>
                                    <FormItem>
                                        <FormControl>
                                            <div>
                                                <Checkbox checked={initialData.campaignTarget.filter(target => target === "Students").length === 1} id="Students" className='mr-2' onCheckedChange={(change) => 
                                                {
                                                    if(!change)
                                                        initialData.campaignTarget = initialData.campaignTarget.filter(value => value !== 'Students')
                                                    else
                                                        initialData.campaignTarget.push('Students')
                                                    setHasChecked(current => !current)                                            
                                                }}/>
                                                <label htmlFor="Students">Students</label>
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                    <FormItem>
                                        <FormControl>
                                            <div>
                                                <Checkbox checked={initialData.campaignTarget.filter(target => target === "Teachers").length === 1} id="Teachers" className='mr-2' onCheckedChange={(change) => 
                                                {
                                                    if(!change)
                                                        initialData.campaignTarget = initialData.campaignTarget.filter(value => value !== 'Teachers')
                                                    else
                                                        initialData.campaignTarget.push('Teachers')
                                                    setHasChecked(current => !current)                                           
                                                }}/>
                                                <label htmlFor="Teachers">Teachers</label>
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                    <FormItem>
                                        <FormControl>
                                            <div>
                                                <Checkbox checked={initialData.campaignTarget.filter(target => target === "Healthcare Workers").length === 1} id="Healthcare Workers" className='mr-2' onCheckedChange={(change) => 
                                                {
                                                    if(!change)
                                                        initialData.campaignTarget = initialData.campaignTarget.filter(value => value !== 'Healthcare Workers')
                                                    else
                                                        initialData.campaignTarget.push('Healthcare Workers')
                                                    setHasChecked(current => !current)                                           
                                                }}/>
                                                <label htmlFor="Healthcare Workers">Healthcare Workers</label>
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                    <FormItem>
                                        <FormControl>
                                            <div>
                                                <Checkbox checked={initialData.campaignTarget.filter(target => target === "Military").length === 1} id="Military" className='mr-2' onCheckedChange={(change) => 
                                                {
                                                    if(!change)
                                                        initialData.campaignTarget = initialData.campaignTarget.filter(value => value !== 'Military')
                                                    else
                                                        initialData.campaignTarget.push('Military')
                                                    setHasChecked(current => !current)                                           
                                                }}/>
                                                <label htmlFor="Military">Military</label>
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                    <FormItem>
                                        <FormControl>
                                            <div>
                                                <Checkbox checked={initialData.campaignTarget.filter(target => target === "First Responders").length === 1} id="First Responders" className='mr-2' onCheckedChange={(change) => 
                                                {
                                                    if(!change)
                                                        initialData.campaignTarget = initialData.campaignTarget.filter(value => value !== 'First Responders')
                                                    else
                                                        initialData.campaignTarget.push('First Responders')
                                                    setHasChecked(current => !current)                                           
                                                }}/>
                                                <label htmlFor="First Responders">First Responders</label>
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                </div>
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