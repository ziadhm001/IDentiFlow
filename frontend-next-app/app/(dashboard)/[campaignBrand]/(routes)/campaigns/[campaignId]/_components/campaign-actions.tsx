"use client"

import { ConfirmModal } from "@/components/modals/confirm-modal"
import { Button } from "@/components/ui/button"
import { useConfettiStore } from "@/hooks/use-confetti-store"
import axios from "axios"
import { Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

interface CampaignActionsProps {
    disabled: boolean,
    campaignBrand: string,
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

export const CampaignActions = ({disabled, campaignBrand, initialData} : CampaignActionsProps) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const confetti = useConfettiStore()
    const activateCampaign = async () => {
        try{
            initialData.isActive = !initialData.isActive
            axios.put('/api/campaigns', initialData).then(res =>{
                toast.success('Campaign status updated successfully')
                router.refresh()
                if(initialData.isActive)
                    confetti.onOpen()
            })
        }
        catch{
            toast.error('Something wrong happend!')
        }
        
    }
    const deleteCampaign = async () => {
        setIsLoading(true)
        axios.delete(`/api/campaigns/${initialData.campaignId}`).then(res => {
            if(res.data.success)
                toast.success('Campaign deleted successfully')
            else
                toast.error('Campaign already deleted!')
            router.refresh()
            router.push(`/${campaignBrand}/campaigns`)
        }).catch(error => {
            toast.error('Something wrong happend')
        }).finally(() => {
            setIsLoading(false)
        })
    } 

    return(
        <div className="flex items-center gap-x-2">
            <Button
                onClick={activateCampaign}
                disabled={disabled || isLoading}
                variant={initialData.isActive ? "outline" : "add"}
                size="sm"
            >
                {initialData.isActive ? "Deactivate" : "Activate"}
            </Button>
            <ConfirmModal onConfirm={deleteCampaign}>
                <Button size="sm" disabled={isLoading}>
                    <Trash className="h-4 w-4"/>
                </Button>
            </ConfirmModal>
        </div>
    )
}