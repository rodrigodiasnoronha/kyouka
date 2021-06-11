import { Client } from 'discord.js';
import './database';

export class Kyouka {
    public token: string;
    public client: Client;

    constructor() {
        this.token = process.env.BOT_TOKEN as string;
        this.client = new Client();
    }

    start() {
        this.client.login(this.token);
    }
}
