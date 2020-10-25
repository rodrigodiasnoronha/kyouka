import { Message } from 'discord.js';
import { CommandInterface } from '../../types';
import { sendSuccessMessage } from '../../utils/sendMessage';

export default class Invite implements CommandInterface {
    public title = 'Invite';
    public description =
        'Deixe-me te enviar um link para me adicionar em qualquer servidor!';
    public aliases = ['invite'];
    public args = '';
    public async run(message: Message, args: string[]) {
        try {
            const clientID = message.client.user?.id;
            const inviteLink = `https://discord.com/api/oauth2/authorize?client_id=${clientID}&permissions=8&scope=bot`;

            await message.author.send(
                `Olá, ${message.author.username}! Abaixo eu deixo um link para você me adicionar em qualquer servidor: \n${inviteLink}`
            );
            return sendSuccessMessage(
                `<@${message.author}>, verifique sua DM`,
                message
            );
        } catch (err) {}
    }
}
