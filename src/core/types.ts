import { Message, PermissionString } from "discord.js"
import type { Bot } from './Bot'

/**
 * 
 * Bot types
 * 
 */

    export interface BotCommand {
        title: string
        description: string
        aliases: string[]
        args: string[]
        category: BotCommandCategory
        permission: PermissionString[]
        execute: (kyouka: Bot, message: Message, args: string[]) => Promise<void>;
    }

    export enum BotCommandCategory {
        ANIMATION = 'animation',
        UTILTITY = 'utility',
        DEVELOPER = 'developer',
        MODERATION = 'moderation',

    }


/**
 * 
 * Language types
 * 
 */


    export interface Language {
        name: string; // language name
        commands: LanguageCommand[]

    }

    export interface LanguageCommand {
        name: string // command name
        info: LanguageCommandInfo
    }

    export interface LanguageCommandInfo {
        title: string;
        description: string;
    }
