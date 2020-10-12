import { CommandInterface, GuildModelInterface } from '../../types';
import { Client, Message } from 'discord.js';
export default class Autorole implements CommandInterface {
    title: string;
    description: string;
    aliases: string[];
    args: string;
    run(client: Client, message: Message, args: string[]): Promise<Message | undefined>;
    helper(message: Message): Promise<Message>;
    changeAutoroleStatus(status: boolean, guild: GuildModelInterface): Promise<void>;
}
