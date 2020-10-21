import { Message, PartialMessage, MessageEmbed, TextChannel } from 'discord.js';
import { Guild as GuildModel } from '../database/entities/Guild';
import { createGuild } from '../functions/createGuild';
import { kyoukaColors } from '../utils/colors';

export const messageUpdate = async (
    oldMessage: Message | PartialMessage,
    messageUpdated: Message | PartialMessage
) => {
    try {
        if (!oldMessage.guild || !messageUpdated.guild) return;
        if (!oldMessage.content || !messageUpdated.content) return;

        let guildModel = await GuildModel.findOne({
            guild_id: messageUpdated.guild!.id,
        });
        if (!guildModel) {
            guildModel = await createGuild(messageUpdated.guild);
            if (!guildModel) return;
        }

        if (guildModel.log_status !== 'on' || !guildModel.log_channel) return;

        const channel = messageUpdated.guild.channels.cache.get(
            guildModel.log_channel
        ) as TextChannel;
        if (!channel) return;

        const logEmbed = new MessageEmbed()
            .setTitle('Log - Mensagem atualizada')
            .setColor(kyoukaColors.yellow)
            .addField('Canal', `<#${messageUpdated.channel.id}>`)
            .addField('Mensagem antiga', oldMessage.content)
            .addField('Mensagem atualizada', messageUpdated.content);

        return channel.send(logEmbed);
    } catch (er) {}
};
