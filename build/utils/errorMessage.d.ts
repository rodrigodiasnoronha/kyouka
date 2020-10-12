import { Message } from 'discord.js';
export declare const sendErrorMessage: (error: {
    errorMessage: string;
}, message: Message) => Promise<Message>;
export declare const sendSucessMessage: (sucessMessage: string, message: Message) => Promise<Message>;
