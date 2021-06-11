import { Client } from 'discord.js';
import './database';

// events
import { onReady } from './events/onReady';
import { CommandManager } from './managers/CommandManager';

// types
import { ICommand } from './types';

export class Kyouka {
    public token: string;
    public client: Client;
    public commands: ICommand[];

    constructor() {
        this.token = process.env.BOT_TOKEN as string;
        this.client = new Client();

        this.commands = CommandManager.getAllCommands();
    }

    async start() {
        await this.client.login(this.token);

        this.client.on('ready', () => onReady(this));
    }
}
