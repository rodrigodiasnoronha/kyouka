import { Message } from 'discord.js';
import { CommandInterface } from '../../types';
import { errorReplies } from '../../utils/errorReplies';
import { sendErrorMessage, sendSuccessMessage } from '../../utils/sendMessage';

export default class Prune implements CommandInterface {
    public title = 'Prune';
    public description =
        'Apage as mensagens de BOTS ou somente de algum usuário';
    public aliases = ['prune'];
    public args = '';

    public async run(message: Message, args: string[]) {
        try {
            if (message.channel.type !== 'text') return;

            const user = message.mentions.users.first();
            const messages = await message.channel.messages.fetch({
                limit: 100,
            });

            let filter = (msg: Message) => msg.author.bot;
            if (user) filter = (msg: Message) => msg.author.id === user.id;

            const messagesFiltered = messages.filter(filter);
            await message.channel.bulkDelete(messagesFiltered, true);

            const totalMessagesDeleted = messagesFiltered.array().length;
            const successMessage = user
                ? `${totalMessagesDeleted} mensagens de <@${user}> foram apagadas.`
                : `${totalMessagesDeleted} mensagens de bots foram apagadas.`;

            return sendSuccessMessage(successMessage, message);
        } catch (err) {
            return sendErrorMessage(errorReplies.executingCommand, message);
        }
    }
}
