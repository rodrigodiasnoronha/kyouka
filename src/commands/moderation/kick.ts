import { Client, Message } from 'discord.js';
import { CommandInterface } from '../../types';
import { sendErrorMessage } from '../../utils/errorMessage';
import { errorReplies } from '../../utils/errorReplies';

export default class Kick implements CommandInterface {
    public title = 'Kick';
    public description = 'Expulsar algum membro do usuário.';
    public aliases = ['kick', 'expulsar', 'kickar'];
    public args = '@user motivo';

    async run(client: Client, message: Message, args: string[]) {
        const userHasPermission = message.member?.hasPermission([
            'KICK_MEMBERS',
            'MANAGE_ROLES',
        ]);

        if (!userHasPermission)
            return sendErrorMessage(errorReplies.permission, message);

        const user = message.mentions.users.first();
        const kickReason = args.slice(1).join(' ');

        if (!user || !kickReason)
            return sendErrorMessage(
                errorReplies.kickUserOrReasonMissing,
                message
            );

        const member = message.guild?.member(user);

        if (!member?.kickable)
            return sendErrorMessage(errorReplies.kickUserNotBannable, message);

        try {
            await member.kick();

            return message.channel.send(
                `:white_check_mark: ${user.username}, seu baka! Você foi expulso deste servidor!\nMotivo: ${kickReason}`
            );
        } catch (err) {
            return sendErrorMessage(errorReplies.executingCommand, message);
        }
    }
}
