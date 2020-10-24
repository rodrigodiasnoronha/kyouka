import {
    Client,
    Message,
    MessageEmbed,
    MessageReaction,
    User,
} from 'discord.js';
import { CommandInterface } from '../../types';
import { sendErrorMessage, sendSuccessMessage } from '../../utils/sendMessage';
import { errorReplies } from '../../utils/errorReplies';
import { kyoukaColors } from '../../utils/colors';

export default class Ban implements CommandInterface {
    public title = 'Ban';
    public description = 'Expulsar permanentemente algum usuário.';
    public args = '@user motivo';
    public aliases = ['ban', 'banir'];

    async run(client: Client, message: Message, args: string[]) {
        const userHasPermission = message.member?.hasPermission(
            ['BAN_MEMBERS', 'KICK_MEMBERS'],
            { checkAdmin: true, checkOwner: true }
        );

        if (!userHasPermission)
            return sendErrorMessage(errorReplies.permission, message);

        const user = message.mentions.users.first();
        const banReason = args.slice(1).join(' ');

        if (!user || !banReason)
            return sendErrorMessage(
                errorReplies.banUserOrReasonMissing,
                message
            );

        const bannable = message.guild?.member(user)?.bannable;

        if (!bannable)
            return sendErrorMessage(errorReplies.banUserNotBannable, message);

        try {
            const confirmationEmbed = this.showsConfirmationBanEmbed(
                user,
                banReason
            );
            const confirmationMessage = await message.channel.send(
                confirmationEmbed
            );

            await confirmationMessage.react('✅');
            await confirmationMessage.react('❌');

            const filter = (reaction: MessageReaction, userReaction: User) =>
                ['✅', '❌'].includes(reaction.emoji.name) &&
                userReaction.id === message.author.id;
            const collector = confirmationMessage.createReactionCollector(
                filter,
                { max: 1, time: 20000, maxEmojis: 2 }
            );

            collector.on('collect', async (reaction, user) => {
                // validation emoji
                if (reaction.emoji.name === '❌') {
                    await confirmationMessage.reactions.removeAll();
                    return;
                }

                // ban
                await message.guild?.member(user)?.ban({ reason: banReason });

                // sucess message
                const successEmbed = new MessageEmbed()
                    .setColor(kyoukaColors.green)
                    .setDescription(
                        'Usuário banido. Baka! Ninguém mandou quebrar as regras'
                    );
                await confirmationMessage.delete();
                return await message.channel.send(successEmbed);
            });

            collector.on('end', async () => {
                await confirmationMessage.reactions.removeAll();
            });

            collector.on('dispose', async () => {
                await confirmationMessage.reactions.removeAll();
            });
        } catch (err) {
            return sendErrorMessage(errorReplies.executingCommand, message);
        }
    }

    showsConfirmationBanEmbed(user: User, reason: string) {
        return new MessageEmbed()
            .setTitle(`Banimento - ${user.username}`)
            .setColor(kyoukaColors.red)
            .setDescription(
                `Tem certeza que deseja banir o usuário <@${user}> pelo motivo **${reason}**?`
            );
    }
}
