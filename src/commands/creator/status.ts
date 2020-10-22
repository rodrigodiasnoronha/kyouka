import { CommandInterface } from '../../types';
import { Message, MessageEmbed, MessageReaction, User } from 'discord.js';
import { config } from '../../config/config';
import { sendErrorMessage } from '../../utils/sendMessage';
import { errorReplies } from '../../utils/errorReplies';
import { kyoukaColors } from '../../utils/colors';

export default class Status implements CommandInterface {
    public title = 'Status';
    public description = 'Mude meu Status';
    public aliases = ['status'];
    public args = 'status|type|name';

    public async run(message: Message, args: string[]) {
        if (message.author.id !== config.ownerID) return;
        if (message.channel.type === 'dm' || message.channel.type === 'news')
            return;

        try {
            let status = '';
            let type = '';
            let name = '';

            let embed = new MessageEmbed()
                .setTitle('Kyouka Status')
                .setColor(kyoukaColors.lime)
                .setDescription(
                    `Aqui você pode mudar meu status em todos os servidores. Reaga na reação que corresponde ao tipo de status que queira que eu tenha.`
                )
                .addField(':green_circle: Online', 'Me veja online', false)
                .addField(':yellow_circle: Ausente', 'Me veja ausente', false)
                .addField(
                    ':red_circle: Não perturbar',
                    'Não me perturbe',
                    false
                )
                .addField(
                    ':black_circle: Invisível',
                    'Não me veja online',
                    false
                );

            let msg = await message.channel.send(embed);

            // add reactions
            await msg.react('🟢');
            await msg.react('🟡');
            await msg.react('🔴');
            await msg.react('⚫'); // black

            const emojiList = ['🟢', '🟡', '🔴', '⚫'];
            const reactionFilter = (emoji: MessageReaction, user: User) =>
                emojiList.includes(emoji.emoji.name) &&
                user.id === message.author.id;

            const collector = msg.createReactionCollector(reactionFilter, {
                time: 30000,
            });

            collector.on('end', async (reaction, user) => {
                await msg.reactions.removeAll();
            });

            collector.on('collect', async (reaction, user) => {
                const emoji = reaction.emoji.name;

                status =
                    emoji === '🟢'
                        ? 'online'
                        : emoji === '🟡'
                        ? 'idle'
                        : emoji === '🔴'
                        ? 'dnd'
                        : 'invisible';

                /**
                 * @todo
                 * editar o embed e remover reacções
                 * colocar msg pro usuário escolher o tipo de status (PLAYING, STREAMING, etc)
                 *
                 * depois o usuário digitar o status
                 * */
                await msg.edit('vc reagiu com ' + status);
            });
        } catch (err) {
            return sendErrorMessage(errorReplies.executingCommand, message);
        }
    }
}
