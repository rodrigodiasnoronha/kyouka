import { Message, PermissionString } from 'discord.js';
import packageJson from '../../../../package.json'

import { BotCommand, BotCommandCategory } from '../../types';

import { Bot } from '../../Bot';


export default class Version implements BotCommand {
    public title = 'Versão';
    public description = 'Mostra a versão da BOT';
    public aliases = ['versao', 'version', 'v'];
    public args = []
    public category: BotCommandCategory = BotCommandCategory.UTILTITY;
    public permission: PermissionString[] = [];

    async execute(bot: Bot, message: Message, args: string[]): Promise<void> {
        await message.react('❤️');
    }
}