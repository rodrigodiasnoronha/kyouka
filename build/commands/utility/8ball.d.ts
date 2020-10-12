import { CommandInterface } from '../../types';
import { Client, Message } from 'discord.js';
export default class EightBall implements CommandInterface {
    title: string;
    description: string;
    args: string;
    aliases: string[];
    run(client: Client, message: Message, args: string[]): Promise<Message>;
}
