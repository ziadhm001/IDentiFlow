import * as campaignRepository from '../data-access/campaign-repository.js';
import {
  isAddCampaignDataValid,
  isGetCampaignDataValid,
  isUpdateCampaignDataValid,
  isDeleteCampaignDataValid,
  returnAddError,
  returnDeleteError,
  returnGetError,
  returnUpdateError,
} from './campaign-validators.js';

export async function addCampaign(campaignDetails) {
  let response;

  isAddCampaignDataValid(campaignDetails)
    ? (response = await campaignRepository.addCampaign(campaignDetails))
    : (response = returnAddError(campaignDetails));

  return response;
}

export async function getCampaign(campaignDetails) {
  let response;

  isGetCampaignDataValid(campaignDetails)
    ? (response = await campaignRepository.getCampaign(campaignDetails))
    : (response = returnGetError(campaignDetails));

  return response;
}

export async function getAllCampaigns() {
  let response = await campaignRepository.getAllCampaigns();
  return response;
}

export async function updateCampaign(campaignDetails) {
  let response;
  (await isUpdateCampaignDataValid(campaignDetails))
    ? (response = await campaignRepository.updateCampaign(campaignDetails))
    : (response = returnUpdateError(campaignDetails));

  return response;
}

export async function deleteCampaign(campaignDetails) {
  let response;

  isDeleteCampaignDataValid(campaignDetails)
    ? (response = await campaignRepository.deleteCampaign(campaignDetails))
    : (response = returnDeleteError(campaignDetails));

  return response;
}
