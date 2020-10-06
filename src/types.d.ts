import { Client, Message } from 'discord.js';
import { Document } from 'mongoose';

interface CommandInterface {
    title: string;
    description: string;
    args: string;
    aliases: Array<string>;
    run(client: Client, message: Message, args: string[]): Promise<any> | any;
}

interface MuteDocument extends Document {
    guild_id: string;
    user_id: string;
    reason?: string;
    mute_time: Date;
    muted_by_id: string; // arma
}


interface GuildModelInterface extends Document {
    guild_name: string;
    guild_id: string;
    autorole_status: 'on' | 'off';
    autorole_id?: string;
    prefix: string;
    memberCount?: number;
}