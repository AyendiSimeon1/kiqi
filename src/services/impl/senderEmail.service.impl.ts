import { User } from "../../models/User";
import { SenderEmailService } from "../senderEmail.service";

export class SenderEmailServiceImpl implements SenderEmailService{
    async createSenderEmail(id: number, sender: string, type: string, email: string): Promise<User> {
       const senderEmail
    }
    async getSenderEmailById(id: number): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    getAllSenderEmails(): Promise<[]> {
        throw new Error("Method not implemented.");
    }
    updateSenderEmail(id: number, data: Partial<{ sender: string; type: string; email: string; }>): Promise<User> {
        throw new Error("Method not implemented.");
    }
    deleteSenderEmail(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}