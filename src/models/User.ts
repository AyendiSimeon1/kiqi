export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password?: string; // Optional because of social logins
    organizationName: string;
    googleId?: string;
    walletAddress?: string;
    refreshToken?: string;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface Organization {
    id: string;
    name: string;
    ownerId: string;
}

export interface ChatbotSettings {
    id: string;
    organizationId: string;
    name: string;
    avatarUrl: string;
    theme: string;
    welcomeMessage: string;
    widgetPosition: 'Left Top' | 'Left Bottom' | 'Right Top' | 'Right Bottom';
    tone: 'Informal' | 'Formal';
}

export interface WordpressConnection {
    id: string;
    organizationId: string;
    publicUrl: string;
    username: string;
    // Password should be encrypted at rest
    encryptedPassword?: string;
}