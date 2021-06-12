import { Client, Collection } from 'discord.js';
import './database';
import { onMessage } from './events/onMessage';

// events
import { onReady } from './events/onReady';
import { CommandManager } from './managers/CommandManager';

// types
import { GuildModelInterface, ICommand } from './types';

export class Kyouka {
    public token: string;
    public client: Client;
    public commands: ICommand[];
    public guildCollection: Collection<string, GuildModelInterface>;

    constructor() {
        this.token = process.env.BOT_TOKEN as string;
        this.client = new Client();
        this.guildCollection = new Collection();

        this.commands = CommandManager.getAllCommands();
    }

    async start() {
        await this.client.login(this.token);

        this.client.on('ready', () => onReady(this));
        this.client.on('message', (message) => onMessage(this, message));
    }
}
