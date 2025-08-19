import mongoose, { Schema, Document } from "mongoose";

export interface CampaignDoc extends Document {
  _id: string;
  campaignName: string;
  subjectLine: string;
  campaignType?: string;
  status?: "Active" | "Scheduled" | "Completed" | "Pending" | "Sent";
  deliveryStatus?: "Pending" | "Delivered" | "Failed" ;
  category?: string;
  campaignTopic?: string;
  instructions?: any[]; 
  reward?: string;
  startDate?: Date;
  endDate?: Date;
  sentAt?: Date
  time?: string;
  smsSent?: number;
  emailSent?: number;
  socialPosts?: number;
  conversionRate?: number;
  createdAt: Date;
  updatedAt: Date;
}

const CampaignSchema = new Schema<CampaignDoc>(
  {
    campaignName: { type: String, required: true },
    subjectLine: { type: String, required: true },
    campaignType: { type: String },
    status: {
      type: String,
      enum: ["Active", "Scheduled", "Sent", "Completed", "Pending"],
      default: "Pending",
      required: true,
    },
    deliveryStatus: { type: String, required: true, default: " " },
    category: { type: String, required: true, default: " " },
    campaignTopic: { type: String, required: true, default: " " },
    instructions: { type: [], required: true, default: [] }, 
    reward: { type: String, required: true, default: " " },
    startDate: { type: Date, required: true, default: " " },
    endDate: { type: Date, required: true, default: " " },
    sentAt: { type: Date, required: true, default: null },
    time: { type: Date, required: true, default: " " },
  },
  {
    timestamps: true
  }
);

export const CampaignModel = mongoose.model<CampaignDoc>("Campaign", CampaignSchema);
