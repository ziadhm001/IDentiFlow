import axios from "axios";
import { LayoutDashboard } from "lucide-react";
import { IconBadge } from "@/components/icon-badge";
import { TitleForm } from "./_components/title-form";
import { TargetForm } from "./_components/target-form";
import { DiscountForm } from "./_components/discount-form";
import { Banner } from "@/components/banner";
import { CampaignActions } from "./_components/campaign-actions";

async function getData(campaignId: string): Promise <{campaignId: string, campaignName: string, campaignBrand: string, campaignTarget: string[], campaignDiscountValue: number, isDiscountPercentage: boolean, isActive: boolean}> {
    const response = await axios.get(`http://localhost:5001/api/campaign/${campaignId}`)
    const campaign = response.data
    return campaign.data
}
const CampaignIdPage = async ({params} : { params: {campaignId: string, mode: string} }) => {
    const { campaignId } = params
    const campaign = await getData(campaignId)
    console.log(campaign)

    const requiredFields = [
        campaign.campaignName,
        campaign.campaignTarget,
        campaign.campaignDiscountValue
    ]

    const totalFields = requiredFields.length
    const completedFields = requiredFields.filter(Boolean).filter(item => Array.isArray(item) ? item.length === 0 ? false : true : true).length
    const completedText = `${completedFields}/${totalFields}`
    const isCompleted = completedFields === totalFields
    return(
        <>
            {
                !campaign.isActive &&
                    <Banner
                        variant="warning"
                        label="This campaign is not currently active, which means users won't be able to use it."
                    />
            }
            <div className="p-6">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-y-2">
                        <h1 className="text-2xl font-medium">
                            Campaign Setup
                        </h1>
                        <span className="text-sm text-slate-700">
                            Complete all fields ({completedText})
                        </span>
                    </div>
                    <CampaignActions
                            disabled={!isCompleted}
                            initialData={campaign}
                            mode={params.mode}
                    />
                </div>
                <div className="grid grid-cols-1 gap-6 mt-16">
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={LayoutDashboard}/>
                            <h2 className="text-xl">
                                Customize your campaign
                            </h2>
                        </div>
                        <TitleForm 
                            initialData={campaign}
                        />
                        <TargetForm
                            initialData={campaign}
                        />
                        <DiscountForm
                            initialData={campaign}
                        />
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default CampaignIdPage;