import { GuildMember, PartialGuildMember } from 'discord.js';
import { Guild } from '../database/entities/Guild';
import { createGuild } from '../functions/createGuild';

export const guildMemberAdd = async (
    guildMember: GuildMember | PartialGuildMember
) => {
    let guild = await Guild.findOne({ guild_id: guildMember.guild.id });
    if (!guild) {
        guild = await createGuild(guild);
        if (!guild) return;
    }

    guild.memberCount = guildMember.guild.memberCount;
    await guild.save();

    if (guild.autorole_status === 'on' && guild.autorole_id) {
        await guildMember.roles.add(guild.autorole_id);
    }
};
