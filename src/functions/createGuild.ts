import {Guild} from "discord.js";
import {Guild as GuildModel} from '../database/entities/Guild'

export const createGuild = async (guild: Guild | null) => {
    if (!guild) return null;
    return await GuildModel.create({
        guild_name: guild.name,
        guild_id: guild.id,
        autorole_status: 'off',
        prefix: process.env.BOT_PREFIX || '.',
        memberCount: guild.memberCount
    })
}