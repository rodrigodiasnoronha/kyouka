import {CommandInterface} from "../../types";
import {Client, Message} from "discord.js";
import {sendErrorMessage} from "../../utils/sendMessage";

export default class Support implements CommandInterface {
    public title  = 'Support';
    public description = 'Obtenha suporte da minha equipe!';
    public args = '';
    public aliases = ['support', 'suporte'];
    public async run(client: Client, message: Message, args: string[]) {
        try {
            const linkSupportServer = 'https://discord.gg/edkCtZs';
            const dmMessage = `Olá, ${message.author.username}, parece que você está precisando de ajuda com meus comandos ou algo assim. Abaixo deixo o link de meu servidor de suporte. Fique a vontade para tirar dúvidas e dar sugestões.\n${linkSupportServer}`;

            await message.author.send(dmMessage);
            return message.reply('verifique sua DM.');
        } catch (err) {
            return sendErrorMessage({errorMessage: 'Parece que não consegui te enviar uma mensagem na DM. Se puder abrir sua caixa de mensagens, talvez isso resolva esse problema.'}, message);
        }
    }
}