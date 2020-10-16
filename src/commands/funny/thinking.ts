import { CommandInterface } from '../../types';
import { Client, Message, MessageEmbed } from 'discord.js';
import { images } from '../../utils/images';
import { sendErrorMessage } from '../../utils/sendMessage';

export default class Thinking implements CommandInterface {
    public title = 'Thinking';
    public description = 'Demonstre que você está pensando em algo';
    public args = 'mensagem';
    public aliases = ['pensando', 'thinking'];

    public async run(client: Client, message: Message, args: string[]) {
        let gif =
            images.thinkingCommand[
                Math.floor(Math.random() * images.thinkingCommand.length)
            ];
        let user = message.mentions.users.first();
        let reply = `<@${message.author}> esta pensando...`;

        if (args.length && !user) {
            reply = `<@${message.author}> esta pensando ${args.join(' ')}`;
        }

        if (user) {
            reply = `<@${message.author}> está pensando em <@${user}>!`;
        }

        if (user && user.bot && user.id === client.user!.id)
            return sendErrorMessage(
                {
                    errorMessage: 'Pare de pensar em mim. BAKA!',
                },
                message
            );

        const messageEmbed = new MessageEmbed()
            .setDescription(reply)
            .setImage(gif);

        return message.channel.send(messageEmbed);
    }
}
