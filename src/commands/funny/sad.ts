import { CommandInterface } from '../../types';
import { Client, Message, MessageEmbed } from 'discord.js';
import { images } from '../../utils/images';

export default class Sad implements CommandInterface {
    public title = 'Sad';
    public description = 'Demonstre que você esta triste';
    public aliases = ['sad', 'triste', 'tristeza'];
    public args = '';
    private messages = [
        'Nada mais faz sentido...',
        'A vida não faz sentido...',
        'Tudo esta tão escuro...',
        'Nada mais tem graça...',
    ];

    public async run(client: Client, message: Message, args: string[]) {
        const sadGif =
            images.sadCommand[
                Math.floor(Math.random() * images.sadCommand.length)
            ];
        const customMessage = this.messages[
            Math.floor(Math.random() * this.messages.length)
        ];

        const messageEmbed = new MessageEmbed()
            .setDescription(
                `<@${message.author}> está triste! - ${customMessage}`
            )
            .setImage(sadGif);

        return message.channel.send(messageEmbed);
    }
}
