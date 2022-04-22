import { Message, PermissionString } from 'discord.js';

import { Bot } from '../../Bot';

import { BotCommand, BotCommandCategory } from '../../types';


export default class Kiss implements BotCommand {
    public title = 'Beijar';
    public description = 'Beije alguém';
    public aliases = ['kiss', 'beijar', 'beijo'];
    public args = ['@user'];
    public category: BotCommandCategory = BotCommandCategory.ANIMATION;
    public permission: PermissionString[] = [];

    async execute(bot: Bot, message: Message, args: string[]): Promise<void> {
        const user = message.mentions.users.first();


        let msg = bot.i18next.t('commands.kiss.messages.kiss',  { user: `<@${message.author.id}>` , user_2: `<@${user?.id}>` });
        await message.channel.send(msg);
        
    }
}
