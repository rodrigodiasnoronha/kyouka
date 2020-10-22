import { CommandInterface } from '../../types';
import { Client, Message } from 'discord.js';
import { sendErrorMessage, sendSuccessMessage } from '../../utils/sendMessage';
import { errorReplies } from '../../utils/errorReplies';

export default class Chat implements CommandInterface {
    public title = 'Chat';
    public description = 'Ative ou desative o chat do seu servidor';
    public aliases = ['chat', 'canal'];
    public args = 'on/off';
    public async run(client: Client, message: Message, args: string[]) {
        if (!message.guild) return;

        const userHasPermission = message.member?.hasPermission(
            ['ADMINISTRATOR'],
            { checkAdmin: true, checkOwner: true }
        );

        if (!userHasPermission)
            return sendErrorMessage(errorReplies.permission, message);

        if (!['on', 'off'].includes(args[0]))
            return sendErrorMessage(
                {
                    errorMessage:
                        'Você precisa digitar `on` ou `off` como argumento',
                },
                message
            );

        const channel = message.guild.channels.cache.get(message.channel.id);
        if (!channel) return;

        try {
            if (args[0] === 'on') {
                await channel.createOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: true,
                });
            } else {
                await channel.createOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: false,
                });
            }
            return sendSuccessMessage(
                `Canal ${args[0] === 'on' ? 'liberado' : 'desativado'}`,
                message
            );
        } catch (err) {
            return sendErrorMessage(errorReplies.executingCommand, message);
        }
    }
}
