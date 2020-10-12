import { Collection, Message } from 'discord.js';
export declare const message: (message: Message, prefixCollection: Collection<string, string>) => Promise<Message | undefined>;
