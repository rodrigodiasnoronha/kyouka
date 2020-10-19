import { Client, Collection, Message } from 'discord.js';
import { Document } from 'mongoose';

interface CommandInterface {
    title: string;
    description: string;
    args: string;
    aliases: Array<string>;
    run: run1 | run2;
}

interface run1 {
    (client: Client, message: Message, args: string[]): Promise<any> | any;
}

interface run2 {
    (
        client: Client,
        message: Message,
        args: string[],
        prefixCollection: Collection<string, string>
    ): Promise<Message | undefined> | Promise<any> | any;
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
    welcome_status: 'on' | 'off';
    welcome_title: string;
    welcome_subtitle: string;
    welcome_footer: string;
    welcome_image?: string;
    welcome_channel?: string;
    welcome_thumbnail?: string;
}
