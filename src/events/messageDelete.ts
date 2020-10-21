import { Message, MessageEmbed, PartialMessage, TextChannel } from 'discord.js';
import { Guild as GuildModel } from '../database/entities/Guild';
import { createGuild } from '../functions/createGuild';
import { kyoukaColors } from '../utils/colors';

export const messageDelete = async (message: Message | PartialMessage) => {
    if (!message.guild) return;
    if (message.channel.type === 'dm') return;

    let guildModel = await GuildModel.findOne({ guild_id: message.guild.id });
    if (!guildModel) {
        guildModel = await createGuild(message.guild);
        if (!guildModel) return;
    }

    if (guildModel.log_status !== 'on' || !guildModel.log_channel) return;

    const channel = message.guild.channels.cache.get(
        guildModel.log_channel
    ) as TextChannel;
    if (!channel) return;

    const logEmbed = new MessageEmbed()
        .setTitle('Log - Mensagem deletada')
        .setColor(kyoukaColors.red)
        .addField(
            'A seguinte mensagem foi deletada',
            '```' + message.content + '```'
        );

    return channel.send(logEmbed);
};
