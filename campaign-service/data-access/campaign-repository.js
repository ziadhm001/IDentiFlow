import { Campaign } from "./models/campaign-model.js";
import { getRaw } from "./campaign-processor.js";

export async function addCampaign(campaignDetails) {
    const addingResponse = getRaw(await Campaign.create(campaignDetails));
    if(addingResponse)
        return {success: true, data: addingResponse}
    else
        return {success: false, data: "Error with adding record"}
}

export async function getCampaign(campaignDetails) {
    const gettingResponse = getRaw(await Campaign.findOne(campaignDetails));
    if(gettingResponse)
        return {success: true, data: gettingResponse}
    else
        return {success: false, data: "Error with getting record"}
}

export async function updateCampaign(campaignDetails) {
    const { _id } = campaignDetails
    const updatingResponse = getRaw(await Campaign.findOneAndUpdate({_id}, campaignDetails, {new: true}));
    if(updatingResponse)
        return {success: true, data: updatingResponse}
    else
        return {success: false, data: "Error with updating record"}
}

export async function deleteCampaign(campaignDetails) {
    const gettingResponse = getRaw(await Campaign.findOneAndRemove(campaignDetails));
    if(gettingResponse)
        return {success: true, data: gettingResponse}
    else
        return {success: false, data: "Error with getting record"}
}