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
    campaignId: string,
    isActive: boolean,
    mode: string
}

export const CampaignActions = ({disabled, campaignId, isActive, mode} : CampaignActionsProps) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const confetti = useConfettiStore()
    const activateCampaign = async () => {
        confetti.onOpen()
    }
    const deleteCampaign = async () => {
        setIsLoading(true)
        axios.delete(`/api/campaigns/${campaignId}`).then(res => {
            if(res.data.success)
                toast.success('Campaign deleted successfully')
            else
                toast.error('Campaign already deleted!')
            router.refresh()
            router.push(`/${mode}/campaigns`)
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
                variant="outline"
                size="sm"
            >
                {isActive ? "Deactivate" : "Activate"}
            </Button>
            <ConfirmModal onConfirm={deleteCampaign}>
                <Button size="sm" disabled={isLoading}>
                    <Trash className="h-4 w-4"/>
                </Button>
            </ConfirmModal>
        </div>
    )
}