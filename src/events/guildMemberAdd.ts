import {
    Client,
    GuildMember,
    PartialGuildMember,
    User,
    Guild,
    MessageEmbed,
    TextChannel,
} from 'discord.js';
import { Guild as GuildModel } from '../database/entities/Guild';
import { createGuild } from '../functions/createGuild';
import { GuildModelInterface } from '../types';

export const guildMemberAdd = async (
    guildMember: GuildMember | PartialGuildMember
) => {
    let guild = await GuildModel.findOne({ guild_id: guildMember.guild.id });
    if (!guild) {
        guild = await createGuild(guild);
        if (!guild) return;
    }

    guild.memberCount = guildMember.guild.memberCount;
    await guild.save();

    if (guild.autorole_status === 'on' && guild.autorole_id) {
        await guildMember.roles.add(guild.autorole_id);
    }

    if (guild.welcome_status === 'on' && guild.welcome_channel && guildMember.user) {
        await sendWelcomeMessage(guildMember.client, guild, guildMember.user, guildMember.guild);
    }
};

/**
 *
 *
 * guildModel = Objeto da entidade Guild do Mongoose
 * guild = Servidor que o usuário entrou
 *
 * */

export async function sendWelcomeMessage(
    client: Client,
    guildModel: GuildModelInterface,
    user: User,
    guild: Guild
) {
    if (guildModel.welcome_status !== 'on') return;

    if (!guildModel.welcome_channel) return;

    const welcomeChannel = client.channels.cache.get(
        guildModel.welcome_channel
    ) as TextChannel;
    if (!welcomeChannel) return;

    // formatação title
    let title = guildModel.welcome_title.replace(/\$user/g, user.tag);
    title = title.replace(/\$server_name/g, guild.name);

    // formatação subtitle
    let subtitle = guildModel.welcome_subtitle.replace(
        /\$member_count/g,
        String(guildModel.memberCount)
    );
    subtitle = subtitle.replace(/\$user/g, `<@${user}>`);

    // formatação footer
    let footer = guildModel.welcome_footer.replace(/\$user_id/g, user.id);
    footer = footer.replace(/\$username/g, user.username);
    footer = footer.replace(/\$user/g, `<@${user}>`);

    const welcomeEmbed = new MessageEmbed();

    if (title) welcomeEmbed.setTitle(title);
    if (subtitle) welcomeEmbed.setDescription(subtitle);
    if (guildModel.welcome_thumbnail)
        welcomeEmbed.setThumbnail(guildModel.welcome_thumbnail);
    if (footer) welcomeEmbed.setFooter(footer);
    if (guildModel.welcome_image)
        welcomeEmbed.setImage(guildModel.welcome_image);

    welcomeChannel.send(welcomeEmbed);
}
