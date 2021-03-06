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

        // log
        log_status: 'off',
        log_channel: '',

        // welcome
        welcome_status: 'off',
        welcome_title: 'Bem vindo, $name!',
        welcome_subtitle: 'Agora temos $member_count neste servidor!',
        welcome_footer: 'ID do usuário: $user_id',
        welcome_image: '',
        welcome_thumbnail: 'https://i.imgur.com/3bzRV1z.png',

        // leave
        leave_status: 'off',
        leave_title: 'Adeus, $name!',
        leave_subtitle:
            'Até a próxima, $user! Agora temos $member_count membros!',
        leave_footer: 'ID do usuário: $user_id',
        leave_image: '',
        leave_thumbnail: 'https://i.imgur.com/3bzRV1z.png',
    });
};
