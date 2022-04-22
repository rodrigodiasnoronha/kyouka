import { Message, PermissionString } from 'discord.js';
import type { Bot } from './Bot';
import { GuildEntity } from './database/entities/GuildEntity';

/**
 *
 * Bot types
 *
 */

export interface BotCommand {
    aliases: string[];
    category: BotCommandCategory;
    permission: PermissionString[];
    execute: (kyouka: Bot, message: Message, args: string[], guildEntity: GuildEntity) => Promise<void>;
}

export enum BotCommandCategory {
    ANIMATION = 'animation',
    UTILTITY = 'utility',
    DEVELOPER = 'developer',
    MODERATION = 'moderation',
}

export enum StatusRole {
    ON = 'on',
    OFF = 'off',
}

/**
 *
 * Language types
 *
 */

export interface Language {
    name: string; // language name
    commands: { [key: string]: object | string };
    error: { [key: string]: object | string };
}
