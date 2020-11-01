import { Message, MessageEmbed } from "discord.js";
import { CommandInterface } from "../../types";
import { kyoukaColors } from "../../utils/colors";
import { images } from "../../utils/images";
import { sendErrorMessage } from "../../utils/sendMessage";



export default class Kiss implements CommandInterface {
    public title = 'Kiss';
    public description = 'Beije alguém';
    public aliases = ['kiss', 'beijar'];
    public args = '@user';
    public async run(message: Message, args: string[]) {
        const user = message.mentions.users.first();
        const gif = images.kissGif[Math.floor(Math.random() * images.kissGif.length)];
        const messageEmbed = new MessageEmbed().setImage(gif);

        if (!user) {
            return sendErrorMessage(      { errorMessage:  `você não pode beijar ninguém! Mencione um usuário! :wink: `}
            , message)
        }


        if (user.bot && user.id === message.client.user!.id) {
            return sendErrorMessage({  errorMessage:  'desculpe, eu já estou comprometida! :relieved: '}, message)
        }

        messageEmbed.setDescription(`<@${message.author}> beijou <@${user}>! Shippo demais!`)
        messageEmbed.setColor(kyoukaColors.yellow)
        return message.channel.send(messageEmbed);
    }
}