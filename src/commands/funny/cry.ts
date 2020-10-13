import { CommandInterface } from '../../types';
import { Client, Message, MessageEmbed } from 'discord.js';
import { images } from '../../utils/images';

export default class CryCommand implements CommandInterface {
    public title = 'Cry';
    public description = 'Chorar um pouco';
    public aliases = ['cry', 'chorar'];
    public args = '';

    public async run(client: Client, message: Message, args: string[]) {
        const gif =
            images.cryCommand[
                Math.floor(Math.random() * images.cryCommand.length)
            ];

        const messageEmbed = new MessageEmbed()
            .setDescription(`<@${message.author}> está chorando!`)
            .setImage(gif);

        return message.channel.send(messageEmbed);
    }
}
