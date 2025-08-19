
export interface AnalyticsService {
    getAnalyticsData(): Promise<any>;
    getAnalyticsByCampaignId(campaignId: String): Promise<any>;
}