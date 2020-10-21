import {
    Guild,
    MessageEmbed,
    PartialUser,
    TextChannel,
    User,
} from 'discord.js';
import { Guild as GuildModel } from '../database/entities/Guild';
import { createGuild } from '../functions/createGuild';
import { kyoukaColors } from '../utils/colors';

export const guildBanAdd = async (guild: Guild, user: User | PartialUser) => {
    let guildModel = await GuildModel.findOne({ guild_id: guild.id });
    if (!guildModel) {
        guildModel = await createGuild(guild);
        if (!guildModel) return;
    }

    if (guildModel.log_status !== 'on' || !guildModel.log_channel) return;

    const channel = guild.channels.cache.get(
        guildModel.log_channel
    ) as TextChannel;
    if (!channel) return;

    const logEmbed = new MessageEmbed()
        .setTitle('Log - BAN')
        .setColor(kyoukaColors.red)
        .addField('Usuário banido:', '```' + user.tag + '```')
        .addField('ID do usuário banido', user.id);

    return channel.send(logEmbed);
};
