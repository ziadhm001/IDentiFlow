import mongoose from 'mongoose';
import { Campaign } from '../data-access/models/campaign-model.js';

export function isAddCampaignDataValid(campaignDetails) {
  if (!campaignDetails || !campaignDetails.campaignBrand) return false;
  if (!mongoose.Types.ObjectId.isValid(campaignDetails.campaignBrand))
    return false;
  return true;
}

export function isGetCampaignDataValid(campaignDetails) {
  const { _id } = campaignDetails;
  if (!mongoose.Types.ObjectId.isValid(_id)) return false;
  return true;
}

export async function isUpdateCampaignDataValid(campaignDetails) {
  const { _id } = campaignDetails;
  if (_id) {
    const campaign = await Campaign.findOne({ _id });
    if (!campaign) return false;
  } else return false;
  if (!campaignDetails || !campaignDetails._id) return false;
  if (
    !campaignDetails.campaignBrand &&
    !mongoose.Types.ObjectId.isValid(campaignDetails.campaignBrand)
  )
    return false;
  return true;
}

export function isDeleteCampaignDataValid(campaignDetails) {
  const { _id } = campaignDetails;
  if (!mongoose.Types.ObjectId.isValid(_id)) return false;
  return true;
}

export async function returnAddError(campaignDetails) {
  if (!campaignDetails || !campaignDetails.campaignBrand)
    return { success: false, data: 'Not enough data to create a record' };
  if (!mongoose.Types.ObjectId.isValid(campaignDetails.campaignBrand))
    return { success: false, data: 'Not valid brand id' };
}

export async function returnGetError(campaignDetails) {
  const { _id } = campaignDetails;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return { success: false, data: 'Not valid campaign id' };
}

export async function returnUpdateError(campaignDetails) {
  if (!campaignDetails)
    return { success: false, data: 'Not enough data to update a record' };

  const { _id } = campaignDetails;
  if (_id) {
    const campaign = await Campaign.findOne({ _id });
    if (!campaign)
      return {
        success: false,
        data: 'No campaign matching the provided details',
      };
  } else return { success: false, data: 'No campaign id provided' };

  if (
    !campaignDetails.campaignBrand &&
    !mongoose.Types.ObjectId.isValid(campaignDetails.campaignBrand)
  )
    return { success: false, data: 'Not valid brand id' };
}

export async function returnDeleteError(campaignDetails) {
  const { _id } = campaignDetails;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return { success: false, data: 'Not valid campaign id' };
}
