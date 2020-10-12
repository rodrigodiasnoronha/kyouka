import { CommandInterface } from '../../types';
import { Client, Collection, Message } from 'discord.js';
export declare class Prefix implements CommandInterface {
    title: string;
    description: string;
    aliases: string[];
    args: string;
    run(client: Client, message: Message, args: string[], prefixCollection: Collection<string, string>): Promise<Message | undefined>;
}
