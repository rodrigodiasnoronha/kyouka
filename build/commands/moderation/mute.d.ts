import { Client, Guild, Message, Role } from 'discord.js';
import { CommandInterface } from '../../types';
export default class Mute implements CommandInterface {
    title: string;
    description: string;
    aliases: string[];
    args: string;
    run(client: Client, message: Message, args: string[]): Promise<Message | undefined>;
    createMuteRole(client: Client, guild: Guild | null): Promise<Role | undefined>;
    isMuteTimeValid(muteTime: string): boolean;
}
