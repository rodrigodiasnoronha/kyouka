import { Message, PermissionString } from 'discord.js';
import { Document } from 'mongoose';
import { Kyouka } from './Kyouka';

export enum CommandCategory {
    ANIMATION = 'animation',
    DEVELOPER = 'developer',
    MODERATION = 'moderation',
}

export interface ICommand {
    title: string;
    description: string;
    aliases: string[];
    permission: PermissionString[];
    category: CommandCategory;
    execute: (kyouka: Kyouka, message: Message, args: string[]) => {};
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

    // log properties
    log_channel?: string;
    log_status: 'on' | 'off';

    // welcome properties
    welcome_status: 'on' | 'off';
    welcome_title: string;
    welcome_subtitle: string;
    welcome_footer: string;
    welcome_image?: string;
    welcome_channel?: string;
    welcome_thumbnail?: string;

    // leave properties
    leave_status: 'on' | 'off';
    leave_title: string;
    leave_subtitle: string;
    leave_footer: string;
    leave_image?: string;
    leave_channel?: string;
    leave_thumbnail?: string;
}
