import { CampaignModel } from '../../models/Campaign';
import { AnalyticsService } from '../analytics.service';


export class AnalyticsServiceImpl implements AnalyticsService {
   import { CampaignModel } from '../../models/Campaign'; 
import { AnalyticsService } from '../analytics.service';
import { ApiError } from '../../utils/ApiError';
import { StatusCodes } from 'http-status-codes';

export class AnalyticsServiceImpl implements AnalyticsService {
    // 🔹 Get overall analytics across campaigns
    async getAnalyticsData(): Promise<any> {
        const campaigns = await CampaignModel.find({
            status: { $in: ['Sent', 'Scheduled'] }
        });

        if (!campaigns.length) {
            return {
                totalCampaigns: 0,
                totalEmailsSent: 0,
                totalSmsSent: 0,
                totalSocialPosts: 0,
                avgConversionRate: "0%"
            };
        }

        const totalCampaigns = campaigns.length;

        const totalEmailsSent = campaigns.reduce((acc, c) => acc + (c.emailSent || 0), 0);
        const totalSmsSent = campaigns.reduce((acc, c) => acc + (c.smsSent || 0), 0);
        const totalSocialPosts = campaigns.reduce((acc, c) => acc + (c.socialPosts || 0), 0);
        const totalConversions = campaigns.reduce((acc, c) => acc + (c.conversions || 0), 0);
        const totalUsersReached = totalEmailsSent + totalSmsSent + totalSocialPosts;

        // Average conversion rate across all campaigns
        const avgConversionRate = totalUsersReached > 0 
            ? ((totalConversions / totalUsersReached) * 100).toFixed(2) + "%"
            : "0%";

        return {
            totalCampaigns,
            totalEmailsSent,
            totalSmsSent,
            totalSocialPosts,
            totalConversions,
            avgConversionRate
        };
    }

    // 🔹 Get analytics for a specific campaign
    async getAnalyticsByCampaignId(campaignId: String): Promise<any> {
        const campaign = await CampaignModel.findById(campaignId);

        if (!campaign) {
            throw new ApiError(StatusCodes.NOT_FOUND, "Campaign not found");
        }

        const {
            emailSent = 0,
            smsSent = 0,
            socialPosts = 0,
            conversionRate = 0
        } = campaign;

        const totalDelivered = emailSent + smsSent + socialPosts;

        const openRate = emailSent > 0 ? ((opens / emailSent) * 100).toFixed(2) + "%" : "0%";
        const clickRate = emailSent > 0 ? ((clicks / emailSent) * 100).toFixed(2) + "%" : "0%";
        const unsubscribeRate = emailSent > 0 ? ((unsubscribes / emailSent) * 100).toFixed(2) + "%" : "0%";
        const conversionRate = totalDelivered > 0 ? ((conversions / totalDelivered) * 100).toFixed(2) + "%" : "0%";

        return {
            campaignId,
            campaignName: campaign.campaignName,
            subjectLine: campaign.subjectLine,
            emailSent,
            smsSent,
            socialPosts,
            conversions,
            opens,
            clicks,
            unsubscribes,
            openRate,
            clickRate,
            unsubscribeRate,
            conversionRate
        };
    }
}

}