import { Client, Message } from 'discord.js';
import { CommandInterface } from '../../types';
import { sendErrorMessage, sendSuccessMessage } from '../../utils/sendMessage';
import { errorReplies } from '../../utils/errorReplies';

export default class Unmute implements CommandInterface {
    public title = 'Unmute';
    public description = 'Retirar o mute de algum usuário';
    public aliases = ['unmute', 'desmutar'];
    public args = '@user';

    async run(client: Client, message: Message, args: string[]) {
        const userHasPermission = message.member?.hasPermission(
            ['MUTE_MEMBERS', 'MANAGE_ROLES'],
            { checkAdmin: true, checkOwner: true }
        );

        if (!userHasPermission)
            return sendErrorMessage(errorReplies.permission, message);

        try {
            const user = message.mentions.users.first();
            if (!user)
                return sendErrorMessage(errorReplies.mentionUser, message);

            const muteRole = message.guild?.roles.cache.find(
                (role) => role.name === 'Kyouka Mute'
            );

            if (!muteRole) return;

            const isUserMuted = message.guild
                ?.member(user)
                ?.roles.cache.find((role) => role.name === 'Kyouka Mute');

            if (!isUserMuted)
                return sendErrorMessage(errorReplies.userNotMuted, message);

            // remove o mute do usuário
            message.guild?.member(user)?.roles.remove(muteRole);

            return sendSuccessMessage('Usuário desmutado', message);
        } catch (err) {
            return sendErrorMessage(errorReplies.executingCommand, message);
        }
    }
}
