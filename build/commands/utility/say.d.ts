import { CommandInterface } from '../../types';
import { Client, Message } from 'discord.js';
export default class SayCommand implements CommandInterface {
    title: string;
    description: string;
    aliases: string[];
    args: string;
    run(client: Client, message: Message, args: string[]): Promise<Message>;
}
