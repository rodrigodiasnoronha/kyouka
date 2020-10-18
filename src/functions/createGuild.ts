import { Guild } from 'discord.js';
import { Guild as GuildModel } from '../database/entities/Guild';

export const createGuild = async (guild: Guild | null) => {
    if (!guild) return null;
    return await GuildModel.create({
        guild_name: guild.name,
        guild_id: guild.id,
        autorole_status: 'off',
        prefix: process.env.BOT_PREFIX || '.',
        memberCount: guild.memberCount,
        welcome_status: 'off',
        welcome_title: 'Bem vindo, $user!',
        welcome_subtitle: 'Agora temos $member_count neste servidor!',
        welcome_footer: 'Id: $user_id',
        welcome_image: '',
        welcome_thumbnail: 'https://i.imgur.com/3bzRV1z.png',
    });
};
