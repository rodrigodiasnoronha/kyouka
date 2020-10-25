import { Message } from 'discord.js';
import { CommandInterface } from '../../types';

export default class GuildIcon implements CommandInterface {
    public title = 'GuildIcon';
    public description = 'Veja o icone do servidor';
    public aliases = ['gi', 'guildicon'];
    public args = '';
    public async run(message: Message, args: string[]) {
        const guildIconURL = message.guild?.iconURL({
            size: 1024,
            format: 'png',
        });

        if (!guildIconURL) return;

        return message.channel.send({
            files: [guildIconURL],
        });
    }
}
