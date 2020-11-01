import { Message, MessageEmbed } from 'discord.js';
import { CommandInterface } from '../../types';
import { kyoukaColors } from '../../utils/colors';
import { images } from '../../utils/images';

export default class Shame implements CommandInterface {
    public title = 'Shame';
    public description = 'Desmontre que você está com vergonha';
    public aliases = ['shame', 'vergonha'];
    public args = '';
    public async run(message: Message, args: string[]) {
        const gif =
            images.shameGifs[
                Math.floor(Math.random() * images.shameGifs.length)
            ];

        const messageEmbed = new MessageEmbed()
            .setDescription(`<@${message.author}> está envergonhado!`)
            .setColor(kyoukaColors.yellow)
            .setImage(gif);
        return message.channel.send(messageEmbed);
    }
}
