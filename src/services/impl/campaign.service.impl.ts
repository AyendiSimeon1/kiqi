import { StatusCodes } from "http-status-codes";
import { CampaignDoc, CampaignModel } from "../../models/Campaign";
import { ApiError } from "../../utils/ApiError";
import { CampaignService } from "../campaign.service";

export class CampaignServiceImpl implements CampaignService{
    async createCampaign(data: { campaignName: String; subjectLine: String; campaignType: String; }): Promise<CampaignDoc> {
        const isCampaignExists = await CampaignModel.findOne({
            campaignName: data.campaignName
        })
        if(isCampaignExists) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Campaign already exists.")
        }

        const campaign = await CampaignModel.create({
            campaignName: data.campaignName,
            campaignType: data.campaignType,
            subjectLine: data.subjectLine,
        })

        return campaign;
    }
    async getAllCampaigns(): Promise<CampaignDoc[]> {
        return CampaignModel.find();
    }
    async getCampaignById(id: String): Promise<CampaignDoc | null> {
        return CampaignModel.findById(id)
    }
    async updateCampaign(id: String, data: Partial<{campaignName: String, subjectLine: String, campaignType: String}>): Promise<CampaignDoc> {
        const updated = await CampaignModel.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
                runValidators: true,
                updatedAt: Date.now()
            });

            if(!updated){
                throw new Error("Campaign not found or updated")
            }
            updated.save();
            return updated;
    }

    async deleteCampaign(id: String): Promise<void> {
       await CampaignModel.findByIdAndDelete(id)
    }

    async sendCampaign(id: String): Promise<CampaignDoc> {
  const campaign = await CampaignModel.findById(id);
  if (!campaign) throw new ApiError(StatusCodes.NOT_FOUND, "Campaign not found");
    if (campaign.status !== "Scheduled") {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Campaign must be scheduled before sending");
    }
      campaign.status = "Sent";
      campaign.sentAt = new Date();
      await campaign.save();

       return campaign;
   };

    
    async scheduleCampaign(id: String, startDate: Date, endDate: Date, time: string): Promise<CampaignDoc> {
  const campaign = await CampaignModel.findById(id);
  if (!campaign) throw new ApiError(StatusCodes.NOT_FOUND, "Campaign not found");

     campaign.status = "Scheduled";
     campaign.startDate = startDate;
     campaign.endDate = endDate;
     campaign.time = time;
     await campaign.save();

       return campaign;
};


    async getCampaignDeliveryStatus(id: string): Promise<String> {
         const campaign = await CampaignModel.findById(id);
         if (!campaign) 
            throw new ApiError(StatusCodes.NOT_FOUND, "Campaign not found");

         if (!campaign.deliveryStatus) 
            throw new ApiError(StatusCodes.NOT_FOUND, "Delivery status not found for this campaign");
         return campaign.deliveryStatus;
    }
    
}