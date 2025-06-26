import mongoose, { Document, Schema } from "mongoose"

export interface SenderEmailModel extends Document{ 
    _id: string;
    senderName: string;
    type: String;
    senderEmail: string;
}

const SenderEmailSchema: Schema = new Schema<SenderEmailModel>({
    id: {type: String, required: true},
    senderName: { type: String, required: true },
    type: { type: String, required: true }, 
    senderEmail: { type: String, required: true }
})

export const SenderModel = mongoose.model<SenderEmailModel>("SenderEmail", SenderEmailSchema)