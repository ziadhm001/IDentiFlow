import mongoose from "mongoose";

class Campaign {
    constructor(body)
    {
        if(body)
        {
            if(Array.isArray(body))
            {  
                body.map((campaign, index) => {
                    if(index)
                        this.campaign = [...this.campaign, campaign]
                    else
                        this.campaign = [campaign]
                })
            }
            else{
                const {campaignName, campaignBrand, campaignTarget, campaignDiscountValue, isDiscountPercentage, isActive, campaignId , _id} = body
                this._id = campaignId || _id;
                this.campaignName = campaignName;
                this.isActive = isActive;
                this.campaignBrand = campaignBrand;
                this.campaignTarget = campaignTarget;
                this.campaignDiscountValue = campaignDiscountValue;
                this.isDiscountPercentage = isDiscountPercentage;
            }
            
        }
    }
    getData() {
        let data = {}
        if (this.campaign)
            return this.campaign
        if(this._id)
            data._id = this._id
        if(this.campaignName)
            data.campaignName = this.campaignName
        if(this.campaignBrand)
            data.campaignBrand = this.campaignBrand
        if(this.campaignTarget)
            data.campaignTarget = Array.isArray(this.campaignTarget) ? this.campaignTarget : [this.campaignTarget]
        if(this.campaignDiscountValue && !Number.isNaN(parseFloat(this.campaignDiscountValue)))
            data.campaignDiscountValue = parseFloat(this.campaignDiscountValue)
        if(this.isDiscountPercentage === true || this.isDiscountPercentage === false || this.isDiscountPercentage === "true" || this.isDiscountPercentage === "false")
        {
            if(this.isDiscountPercentage === "true")
                data.isDiscountPercentage = true
            else if(this.isDiscountPercentage === "false")
                data.isDiscountPercentage = false
            else
                data.isDiscountPercentage = this.isDiscountPercentage
        }
        if(this.isActive === true || this.isActive === false || this.isActive === "true" || this.isActive === "false")
        {
            if(this.isActive === "true")
                data.isActive = true
            else if(this.isActive === "false")
                data.isActive = false
            else
                data.isActive = this.isActive
        }
        return Object.keys(data).length ? data : null
    }

    getRaw() {
        let data = {}
        if (this.campaign)
            return this.campaign
        if(this._id)
            data.campaignId = this._id.toHexString()
        if(this.campaignName)
            data.campaignName = this.campaignName
        if(this.campaignBrand)
            data.campaignBrand = this.campaignBrand.toHexString()
        if(this.campaignTarget)
            data.campaignTarget = Array.isArray(this.campaignTarget) ? this.campaignTarget : [this.campaignTarget]
        if(this.campaignDiscountValue && !Number.isNaN(parseFloat(this.campaignDiscountValue)))
            data.campaignDiscountValue = parseFloat(this.campaignDiscountValue)
        if(this.isDiscountPercentage === true || this.isDiscountPercentage === false || this.isDiscountPercentage === "true" ||  this.isDiscountPercentage === "false")
        {
            if(this.isDiscountPercentage === "true")
                data.isDiscountPercentage = true
            else if(this.isDiscountPercentage === "false")
                data.isDiscountPercentage = false
            else
                data.isDiscountPercentage = this.isDiscountPercentage
        }
        if(this.isActive === true || this.isActive === false || this.isActive === "true" ||  this.isActive === "false")
        {
            if(this.isActive === "true")
                data.isActive = true
            else if(this.isActive === "false")
                data.isActive = false
            else
                data.isActive = this.isActive
        }
        return Object.keys(data).length ? data : null
    }
}
export const getParsed = (body) => {
    return new Campaign(body).getData()
}

export const getRaw = (body) => {
    return new Campaign(body).getRaw()
}