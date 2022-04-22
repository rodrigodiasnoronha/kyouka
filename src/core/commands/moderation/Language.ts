import { Message, PermissionString } from 'discord.js';

import { Bot } from '../../Bot';

import { BotCommand, BotCommandCategory } from '../../types';

export default class Language implements BotCommand {
    public aliases = ['language', 'idioma', 'lng'];
    public category: BotCommandCategory = BotCommandCategory.MODERATION;
    public permission: PermissionString[] = ['ADMINISTRATOR'];

    async execute(bot: Bot, message: Message, args: string[]): Promise<void> {
        await message.channel.send(args.join(' | '))
    }
}
