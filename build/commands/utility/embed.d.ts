import { Client, Message } from 'discord.js';
import { CommandInterface } from '../../types';
export default class Embed implements CommandInterface {
    title: string;
    description: string;
    aliases: string[];
    args: string;
    run(client: Client, message: Message, args: string[]): Promise<Message | undefined>;
    helper(message: Message): Promise<Message>;
}
