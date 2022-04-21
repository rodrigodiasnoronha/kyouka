import "reflect-metadata"
import { Client } from "discord.js";

import colors from 'colors'

// managers
import { CommandManager } from "./managers/CommandManager";

//events
import { onMessage } from './events/onMessage'

import { BotCommand } from './types'

export class Bot {
    public token: string;
    public client: Client;
    public commands: BotCommand[];
    

    constructor(token: string) {
        this.token = token
        this.client = new Client();

        this.commands = CommandManager.getAllCommands()
    }


    async start(): Promise<void> {
        await this.client.login(this.token);

        this.client.on('ready', () => colors.dim('bot started'))
        this.client.on('message', (message) => onMessage(this, message))
    }
}