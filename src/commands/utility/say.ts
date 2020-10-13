import { CommandInterface } from '../../types';
import { Client, Message } from 'discord.js';
import { sendErrorMessage } from '../../utils/sendMessage';

export default class SayCommand implements CommandInterface {
    public title = 'Say';
    public description = 'Me faça dizer algo';
    public aliases = ['say', 'dizer'];
    public args = 'mensagem';

    public async run(client: Client, message: Message, args: string[]) {
        if (!args)
            return sendErrorMessage(
                {
                    errorMessage:
                        'Você precisa digitar a mensagem que deseja que eu fale',
                },
                message
            );
        return message.channel.send(args.join(' '));
    }
}
