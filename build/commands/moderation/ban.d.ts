import { Client, Message } from 'discord.js';
import { CommandInterface } from '../../types';
export default class Ban implements CommandInterface {
    title: string;
    description: string;
    args: string;
    aliases: string[];
    run(client: Client, message: Message, args: string[]): Promise<Message>;
}
