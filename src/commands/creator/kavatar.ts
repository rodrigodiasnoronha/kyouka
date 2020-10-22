import {CommandInterface} from "../../types";
import {Client, Message} from "discord.js";
import {sendErrorMessage, sendSuccessMessage} from "../../utils/sendMessage";
import {errorReplies} from "../../utils/errorReplies";


export default class Kavatar implements CommandInterface {
    public title = 'Kyouka Avatar';
    public description = 'Comando para mudar o avatar da Kyouka';
    public aliases = ['kavatar'];
    public args = '';
    public async run(client: Client, message: Message, args: string[]) {

        // Meu ID -> Crazy Diamond
        if (message.author.id !== '239171336239448065') return;


        const attachmennt = message.attachments.array()[0];
        if (!attachmennt) return sendErrorMessage({ errorMessage: 'Você precisa enviar uma imagem fixada na mensagem' }, message);


        try {
            await client.user?.setAvatar(attachmennt.url);
            return sendSuccessMessage('Crazy, mudei meu avatar!', message);
        } catch (err) {
            return sendErrorMessage(errorReplies.executingCommand, message)
        }
    }
}