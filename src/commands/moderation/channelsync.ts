import {CommandInterface} from "../../types";
import {Client, Message} from "discord.js";
import {sendErrorMessage, sendSuccessMessage} from "../../utils/sendMessage";
import {errorReplies} from "../../utils/errorReplies";


export default class ChannelSync implements CommandInterface {
    public title = 'ChannelSync';
    public description = 'Sincronize a configuração do seu canal com a configuração da categoria que ele se encontra';
    public aliases = ['channelsync', 'syncchannel', 'cs'];
    public args = '';
    public async run(client: Client, message: Message, args: string[]) {
        if (!message.guild) return;
        const userHasPermission = message.member?.hasPermission(['ADMINISTRATOR'], { checkOwner: true, checkAdmin: true});

        if (!userHasPermission) return sendErrorMessage(errorReplies.permission, message);

        const channel = message.guild.channels.cache.get(message.channel.id);
        if (!channel) return;

        if (!channel.parent) return sendErrorMessage({  errorMessage: 'O canal não possui uma categoria'}, message);

        try {
            await channel.lockPermissions();
            return sendSuccessMessage('Canal sincronizado com sucesso', message);
        }   catch (err ) {
            return sendErrorMessage(errorReplies.executingCommand, message)
        }
    }
}