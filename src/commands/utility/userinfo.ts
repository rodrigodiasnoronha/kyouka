import { CommandInterface } from '../../types';
import { Client, Message, MessageEmbed } from 'discord.js';
import { images } from '../../utils/images';
import moment from 'moment';
import 'moment/locale/pt-br';
import { kyoukaColors } from '../../utils/colors';

export default class Userinfo implements CommandInterface {
    public title = 'UserInfo';
    public description = 'Veja as informações de algum usuário';
    public aliases = ['userinfo'];
    public args = '';
    public async run(client: Client, message: Message, args: string[]) {
        const user = message.mentions.users.size
            ? message.mentions.users.first()
            : message.author;

        if (!user) return;

        const userImage =
            user.avatarURL({ size: 256, format: 'png' }) ||
            images.discordDefaultProfileImage;
        const userCreatedAt = moment(user.createdAt).format('LLLL');

        const messageEmbed = new MessageEmbed()
            .setTitle(`${user.username} - detalhes`)
            .setColor(kyoukaColors.deepPurple)
            .addField(':mag_right: ID:', user.id, false)
            .addField(':paperclip: Entrou no Discord em:', userCreatedAt)
            .addField(
                ':book: Última mensagem:',
                user.lastMessage || 'Desconhecida'
            )
            .setThumbnail(userImage)
            .setFooter(`Solicitado por ${message.author.username}.`);

        return message.channel.send(messageEmbed);
    }
}
