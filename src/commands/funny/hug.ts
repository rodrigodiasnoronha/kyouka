import { Message, MessageEmbed } from 'discord.js';
import { CommandInterface } from '../../types';
import { kyoukaColors } from '../../utils/colors';
import { images } from '../../utils/images';

export default class Hug implements CommandInterface {
    public title = 'Hug';
    public description = 'Dê um abraço em alguém';
    public args = '@user';
    public aliases = ['hug', 'abracar', 'abraçar'];

    public async run(message: Message, args: string[]) {
        const gif =
            images.hugGif[Math.floor(Math.random() * images.hugGif.length)];
        const user = message.mentions.users.first();
        const messageEmbed = new MessageEmbed()
            .setColor(kyoukaColors.yellow)
            .setImage(gif)
            .setDescription(`<@${message.author}> abraçou a si mesmo!`);

        if (user) {
            messageEmbed.setDescription(
                `<@${message.author}> abraçou <@${user}>!`
            );
        }

        return message.channel.send(messageEmbed);
    }
}
