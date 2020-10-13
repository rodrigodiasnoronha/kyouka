import { CommandInterface } from '../../types';
import { Client, Message } from 'discord.js';
import { sendErrorMessage } from '../../utils/sendMessage';

export default class EightBall implements CommandInterface {
    public title = '8Ball';
    public description = 'Me faça uma pergunta e deixe-me fazer uma previsão';
    public args = 'pergunta';
    public aliases = ['8ball'];

    public async run(client: Client, message: Message, args: string[]) {
        const replies = [
            'Não.',
            'Provavelmente.',
            'Talvez.',
            'Sim.',
            'Com certeza.',
        ];

        if (!args.length)
            return sendErrorMessage(
                {
                    errorMessage: 'Você precisa digitar um pergunta.',
                },
                message
            );

        const reply = replies[Math.floor(Math.random() * replies.length)];
        return message.channel.send(reply);
    }
}
