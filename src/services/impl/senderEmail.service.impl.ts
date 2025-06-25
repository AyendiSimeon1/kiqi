import { SenderEmailModel, SenderModel } from "../../models/SenderEmail";
import { User } from "../../models/User";
import { SenderEmailService } from "../senderEmail.service";


export class SenderEmailServiceImpl implements SenderEmailService{
    async createSenderEmail(id: String, sender: String, type: String, email: String): Promise<SenderEmailModel> {
        const isSenderExist = await SenderModel.findOne({ email });

        if (isSenderExist) {
          throw new Error("Sender email already exists");
        }
    
        const newSender = new SenderModel({ id, sender, type, email });
        return await newSender.save();
    }
    async getSenderEmailById(id: String): Promise<SenderEmailModel | null> {
        return SenderModel.findById(id);
    }
    getAllSenderEmails(): Promise<SenderEmailModel[]> {
        return SenderModel.find();
    }
    async updateSenderEmail(id: String, data: Partial<{ sender: string; type: string; email: string; }>): Promise<SenderEmailModel> {
       const updated = await SenderModel.findByIdAndUpdate(id, data, { new: true });

    if (!updated) {
      throw new Error("Sender email not found");
    }

    return updated;
    }
    async deleteSenderEmail(id: String): Promise<void> {
        await SenderModel.findByIdAndDelete(id);
    }
    
}