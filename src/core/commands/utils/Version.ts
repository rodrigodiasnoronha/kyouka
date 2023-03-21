import { Message, PermissionString } from 'discord.js';

import { BotCommand, BotCommandCategory } from '../../types';

import { Bot } from '../../Bot';


export default class Version implements BotCommand {
    public aliases = ['versao', 'version', 'v'];
    public category: BotCommandCategory = BotCommandCategory.UTILTITY;
    public permission: PermissionString[] = [];

    async execute(bot: Bot, message: Message, args: string[]): Promise<void> {
        await message.reply('version 0.0.1')
    }
}