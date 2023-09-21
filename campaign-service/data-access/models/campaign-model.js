import mongoose from "mongoose";

const CampaignSchema = new mongoose.Schema({
    campaignName: String,
    campaignBrand: mongoose.Types.ObjectId,
    campaignTarget: Array,
    campaignDiscountValue: Number,
    isDiscountPercentage: Boolean,
})

export const Campaign = mongoose.model('Campaign', CampaignSchema)