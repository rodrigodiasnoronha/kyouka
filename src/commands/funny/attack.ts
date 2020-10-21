import { CommandInterface } from '../../types';
import { Client, Message, MessageEmbed } from 'discord.js';
import { sendErrorMessage } from '../../utils/sendMessage';
import { errorReplies } from '../../utils/errorReplies';
import { kyoukaColors } from '../../utils/colors';

export default class Attack implements CommandInterface {
    public title = 'Attack';
    public description = 'Ataque alguém';
    public aliases = ['atacar', 'attack'];
    public args = '@user';
    private messages = [
        {
            message: 'Rasen Shuriken!',
            gif:
                'https://i.pinimg.com/originals/0e/0b/41/0e0b4144c51278746600048e780bb8bc.gif',
        },
        {
            message: 'KA-ME-HA-ME-HA!!!',
            gif:
                'https://i.pinimg.com/originals/e0/21/e4/e021e4a9bf146f7e4042f37da18286a4.gif',
        },
        {
            message: 'Morra! Dai!',
            gif:
                'https://i.pinimg.com/originals/ba/74/be/ba74bee37501bfc3f7a2dd883f4738f8.gif',
        },
        {
            message: 'DETROIT... SMASH!!!',
            gif:
                'https://i.pinimg.com/originals/dd/b7/84/ddb78414c7ff864af534ede005db0c63.gif',
        },
        {
            message: 'ORA ORA ORA ORA ORA!',
            gif:
                'https://i.pinimg.com/originals/56/55/b6/5655b624aafb00050359a6d29edf19d0.gif',
        },
        {
            message: 'KATON!',
            gif:
                'https://i.pinimg.com/originals/cf/33/2f/cf332f8e3cb41f574c8c23c94e08d1e1.gif',
        },
        {
            message: 'PLUS... ULTRA!!',
            gif:
                'https://i.pinimg.com/originals/a5/b2/de/a5b2de1d09a87b970ebed2ae0b858e77.gif',
        },
        {
            message: 'MORRA!',
            gif:
                'https://i.pinimg.com/originals/b6/10/c6/b610c621e26dd233f259f21f33c4f400.gif',
        },
        {
            message: 'SUNLIGHT YELLOW OVERDRIVE!',
            gif:
                'https://i.pinimg.com/originals/73/e8/fd/73e8fdb6c5af8fa49da0435c797c9e7f.gif',
        },
        {
            message: 'DORA DORA DORA DORA!',
            gif:
                'https://i.pinimg.com/originals/9b/97/9e/9b979e27c326a7625e19db7078c1b307.gif',
        },
        {
            message: 'ZA WARUDO!',
            gif:
                'https://i.pinimg.com/originals/0e/b7/98/0eb79898902ebd45e7248bc7c20be53c.gif',
        },
        {
            message: 'MUDA MUDA MUDA MUDA MUDA!',
            gif:
                'https://i.pinimg.com/originals/b7/35/75/b73575c3289f3d221fcb8089777b0549.gif',
        },
        {
            message: 'Shinra Tensei!',
            gif:
                'https://i.pinimg.com/originals/9e/f6/02/9ef6022f824e1f45417782a45a330991.gif',
        },
        {
            message: 'Explosion!',
            gif:
                'https://i.pinimg.com/originals/c4/07/40/c4074087283441de471b78e0fb56cf25.gif',
        },
        {
            message: 'SHUT UP!',
            gif:
                'https://i.pinimg.com/originals/0f/c9/e6/0fc9e63a218555ef2460c2c268d8daa5.gif',
        },
        {
            message: 'EMERALD SPLASH!',
            gif:
                'https://vignette.wikia.nocookie.net/powerlisting/images/f/f2/Hierophant_Green_%28JoJo%29_Emerald_Splash.gif/revision/latest?cb=20190717104908',
        },
        {
            message: 'YAMERO!',
            gif:
                'https://i.pinimg.com/originals/fc/15/80/fc15809a249a9ce96f6d408611616226.gif',
        },
    ];

    public async run(client: Client, message: Message, args: string[]) {
        const user = message.mentions.users.first();
        const reply = this.messages[
            Math.floor(Math.random() * this.messages.length)
        ];

        if (!user) return sendErrorMessage(errorReplies.mentionUser, message);

        const messageEmbed = new MessageEmbed()
            .setColor(kyoukaColors.yellow)
            .setDescription(
                `<@${message.author}> atacou <@${user}>! - ${reply.message}`
            )
            .setImage(reply.gif);

        return message.channel.send(messageEmbed);
    }
}
