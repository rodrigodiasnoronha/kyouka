import { Message } from 'discord.js';
import { CommandInterface } from '../../types';
import { images } from '../../utils/images';

export default class Avatar implements CommandInterface {
    public title = 'Avatar';
    public description = 'Veja o seu ou o avatar de outro usuário';
    public aliases = ['avatar'];
    public args = '@user';
    public async run(message: Message, args: string[]) {
        const user = message.mentions.users.first();

        const avatarURL = user
            ? user.avatarURL({ size: 1024, format: 'png' })
            : message.author.avatarURL({ size: 1024, format: 'png' });

        return message.channel.send({
            files: [avatarURL || images.discordDefaultProfileImage],
        });
    }
}
