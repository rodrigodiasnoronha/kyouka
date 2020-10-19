import { CommandInterface } from '../../types';
import { Client, Message } from 'discord.js';

export class Leave implements CommandInterface {
    public title = 'Leave';
    public description =
        'Configure uma mensagem de adeus quando um usuário deixar o servidor';
    public args = '';
    public aliases = ['leave', 'adeus'];
    public async run(client: Client, message: Message, args: string[]) {
        return message.channel.send('leave');
    }
}
