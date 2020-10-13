import { Client, Message } from 'discord.js';
import { CommandInterface } from '../../types';
import { sendErrorMessage, sendSucessMessage } from '../../utils/sendMessage';
import { errorReplies } from '../../utils/errorReplies';

export default class Nickname implements CommandInterface {
    public title = 'Nickname';
    public description = 'Mude o apelido de algum usuário';
    public aliases = ['nickname', 'nomeusuario'];
    public args = 'nickname';

    async run(client: Client, message: Message, args: string[]) {
        const userHasPermission = message.member?.hasPermission([
            'MANAGE_NICKNAMES',
            'CHANGE_NICKNAME',
        ]);

        if (!userHasPermission)
            return sendErrorMessage(errorReplies.permission, message);

        const user = message.mentions.users.first();
        const newNickname = args.slice(1).join(' ');

        if (!user) return sendErrorMessage(errorReplies.mentionUser, message);

        const member = message.guild?.member(user);
        const oldNickname = member?.user.username;

        try {
            if (!newNickname) {
                member?.setNickname(member.user.username);
                return message.channel.send(`
                :white_check_mark: Apelido de ${user.username} redefinido.
            `);
            }

            member?.setNickname(newNickname);

            return sendSucessMessage(`Nickname mudado com sucesso.`, message);
        } catch (err) {
            return sendErrorMessage(errorReplies.executingCommand, message);
        }
    }
}
