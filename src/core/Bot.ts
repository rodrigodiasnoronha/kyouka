import 'reflect-metadata';
import { Client, Collection } from 'discord.js';

// config
import { i18next } from './config/i18next';

//events
import { onMessage } from './events/onMessage';
import { onReady } from './events/onReady';

// managers
import { CommandManager } from './managers/CommandManager';
import { LanguageManager } from './managers/LanguageManager';

// types
import type { i18n } from 'i18next';
import type { BotCommand } from './types';
import type { GuildEntity } from './database/entities/GuildEntity';

export class Bot {
    private _token: string;
    private _prefix: string;
    private _client: Client;
    private _commands: BotCommand[];
    private _supportedLanguages: string[];
    private _guildCollection: Collection<string, GuildEntity>;
    private _i18next: i18n;

    constructor(token: string, prefix: string) {
        this._token = token;
        this._prefix = prefix;
        this._client = new Client();

        this._supportedLanguages = LanguageManager.getSupportedLanguages();
        this._commands = CommandManager.getAllCommands();
        this._guildCollection = new Collection();
        this._i18next = i18next;
    }

    get client() {
        return this._client;
    }

    get prefix() {
        return this._prefix;
    }

    get i18next() {
        return this._i18next;
    }

    get commands() {
        return this._commands;
    }

    get supportedLanguages() {
        return this._supportedLanguages;
    }

    async start(): Promise<void> {
        await this._client.login(this._token);

        this._client.on('ready', () => onReady(this));
        this._client.on('message', (message) => onMessage(this, message));
    }

    setGuildInCollection(guildEntity: GuildEntity): void {
        this._guildCollection.set(guildEntity.id, guildEntity);
    }

    isSupportedLanguage(language: string) {
        return this.supportedLanguages.includes(language);
    }

    getGuildById(id: string): GuildEntity | undefined {
        return this._guildCollection.get(id);
    }
}
