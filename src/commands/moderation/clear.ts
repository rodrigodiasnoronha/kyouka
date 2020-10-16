import { Client, Message } from 'discord.js';
import { CommandInterface } from '../../types';
import { sendErrorMessage, sendSuccessMessage } from '../../utils/sendMessage';
import { errorReplies } from '../../utils/errorReplies';

export default class Clear implements CommandInterface {
    public title = 'Clear';
    public description = 'Limpe as mensagens do chat';
    public aliases = ['clear', 'limpar'];
    public args = 'value';

    async run(client: Client, message: Message, args: string[]) {
        let value = args[0];

        if (message.channel.type === 'dm') return;

        if (isNaN(Number.parseInt(value)))
            return sendErrorMessage(errorReplies.incorrectSintax, message);

        if (parseInt(value) > 100)
            return sendErrorMessage(errorReplies.incorrectSintax, message);

        const msgs = await message.channel.messages.fetch({
            limit: parseInt(value),
        });

        await message.channel.bulkDelete(msgs);

        return sendSuccessMessage(
            `${parseInt(value)} mensagens foram apagadas`,
            message
        );
    }
}
