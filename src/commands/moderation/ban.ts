import { Client, Message } from 'discord.js';
import { CommandInterface } from '../../types';
import { sendErrorMessage, sendSuccessMessage } from '../../utils/sendMessage';
import { errorReplies } from '../../utils/errorReplies';

export default class Ban implements CommandInterface {
    public title = 'Ban';
    public description = 'Expulsar permanentemente algum usuário.';
    public args = '@user motivo';
    public aliases = ['ban', 'banir'];

    async run(client: Client, message: Message, args: string[]) {
        const userHasPermission = message.member?.hasPermission(
            ['BAN_MEMBERS', 'KICK_MEMBERS'],
            { checkAdmin: true, checkOwner: true }
        );

        if (!userHasPermission)
            return sendErrorMessage(errorReplies.permission, message);

        const user = message.mentions.users.first();
        const banReason = args.slice(1).join(' ');

        if (!user || !banReason)
            return sendErrorMessage(
                errorReplies.banUserOrReasonMissing,
                message
            );

        const bannable = message.guild?.member(user)?.bannable;

        if (!bannable)
            return sendErrorMessage(errorReplies.banUserNotBannable, message);

        try {
            await message.guild?.member(user)?.ban({ reason: banReason });

            return sendSuccessMessage(
                'Usuário banido. Baka! Ninguém mandou quebrar as regras',
                message
            );
        } catch (err) {
            return sendErrorMessage(errorReplies.executingCommand, message);
        }
    }
}
