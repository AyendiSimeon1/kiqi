import { User } from "../models/User";

export interface SenderEmailService{
    createSenderEmail(id: number, sender: string, type: string, email: string): Promise<User>
    getSenderEmailById(id: number): Promise<User | null>
    getAllSenderEmails(): Promise<[]>
    updateSenderEmail(id: number, data: Partial<{sender: string, type: string, email: string}>): Promise<User>
    deleteSenderEmail(id: number): Promise<void>
}