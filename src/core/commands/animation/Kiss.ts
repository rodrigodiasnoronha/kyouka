import { Message, PermissionString } from 'discord.js';

import { BotCommand, BotCommandCategory } from '../../types';

import { Bot } from '../../Bot';


export default class Kiss implements BotCommand {
    public title = 'Beijar';
    public description = 'Beije alguém';
    public aliases = ['kiss', 'beijar', 'beijo'];
    public args = ['@user']
    public category: BotCommandCategory = BotCommandCategory.ANIMATION;
    public permission: PermissionString[] = [];

    async execute(bot: Bot, message: Message, args: string[]): Promise<void> {
        await message.react('❤️');
    }
}