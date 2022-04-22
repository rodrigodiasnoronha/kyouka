import 'reflect-metadata';
import { i18next } from './config/i18next';
import { i18n } from 'i18next';
import { Client, Collection } from 'discord.js';

import colors from 'colors';

// managers
import { CommandManager } from './managers/CommandManager';

//events
import { onMessage } from './events/onMessage';

import { BotCommand } from './types';
import type { GuildEntity } from './database/entities/GuildEntity';

export class Bot {
    public token: string;
    public prefix: string;
    public client: Client;
    public commands: BotCommand[];
    public guildCollection: Collection<string, GuildEntity>;
    public i18next: i18n;

    constructor(token: string, prefix: string) {
        this.token = token;
        this.prefix = prefix;
        this.client = new Client();

        this.commands = CommandManager.getAllCommands();
        this.guildCollection = new Collection();
        this.i18next = i18next;
    }

    async start(): Promise<void> {
        await this.client.login(this.token);

        this.client.on('ready', () => console.log(colors.green('bot started')));
        this.client.on('message', (message) => onMessage(this, message));
    }
}