import mongoose, { Document, Schema } from "mongoose"

export interface SenderEmailModel extends Document{ 
    _id: string;
    senderName: String;
    type: String;
    senderEmail: String;
    createdAt?: Date;
    updatedAt?: Date;
}

const SenderEmailSchema: Schema = new Schema<SenderEmailModel>({
    senderName: { type: String, required: true },
    type: { type: String, required: true }, 
    senderEmail: { type: String, required: true }
}, 
{
    timestamps: true
})

export const SenderModel = mongoose.model<SenderEmailModel>("SenderEmail", SenderEmailSchema)