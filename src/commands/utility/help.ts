import { CommandInterface } from '../../types';
import { Client, Message, MessageEmbed } from 'discord.js';

import fs from 'fs';
import { resolve } from 'path';

export class HelpCommand implements CommandInterface {
    public title = 'Help';
    public description = '';
    public aliases = ['ajuda', 'help'];
    public args = '';

    public async run(client: Client, message: Message, args: string[]) {
        return;
    }
}
