import { Message, PermissionString } from 'discord.js';
import { Kyouka } from '../../Kyouka';
import { CommandCategory, ICommand } from '../../types';

export default class Kiss implements ICommand {
    public title = 'Beijar';
    public description = 'Beije alguém';
    public aliases = ['kiss', 'beijar', 'beijo'];
    public args = '@user';
    public category: CommandCategory = CommandCategory.ANIMATION;
    public permission: PermissionString[] = [];

    public async execute(kyouka: Kyouka, message: Message, args: string[]) {
        return message.reply('kiss');
    }
}
