import {
    Client,
    Guild,
    GuildMember,
    MessageEmbed,
    PartialGuildMember,
    TextChannel,
    User,
} from 'discord.js';
import { GuildModelInterface } from '../types';
import { Guild as GuildModel } from '../database/entities/Guild';
import { createGuild } from '../functions/createGuild';
import { kyoukaColors } from '../utils/colors';

export async function guildMemberRemove(
    guildMember: GuildMember | PartialGuildMember
) {
    let guild = await GuildModel.findOne({ guild_id: guildMember.guild.id });
    if (!guild) {
        guild = await createGuild(guild);
        if (!guild) return;
    }

    guild.memberCount = guildMember.guild.memberCount;
    await guild.save();

    if (
        guild.leave_status === 'on' &&
        guild.leave_channel &&
        guildMember.user
    ) {
        await sendLeaveMessage(
            guildMember.client,
            guild,
            guildMember.user,
            guildMember.guild
        );
    }
}

export async function sendLeaveMessage(
    client: Client,
    guildModel: GuildModelInterface,
    user: User,
    guild: Guild
) {
    if (guildModel.leave_status !== 'on') return;

    if (!guildModel.leave_channel) return;

    const leaveChannel = client.channels.cache.get(
        guildModel.leave_channel
    ) as TextChannel;
    if (!leaveChannel) return;

    // formatação title
    let title = guildModel.leave_title.replace(/\$user/g, user.tag);
    title = title.replace(/\$server_name/g, guild.name);

    // formatação subtitle
    let subtitle = guildModel.leave_subtitle.replace(
        /\$member_count/g,
        String(guildModel.memberCount)
    );
    subtitle = subtitle.replace(/\$user/g, `<@${user}>`);

    // formatação footer
    let footer = guildModel.leave_footer.replace(/\$user_id/g, user.id);
    footer = footer.replace(/\$name/g, user.username);
    footer = footer.replace(/\$user/g, `<@${user}>`);

    const leaveEmbed = new MessageEmbed();

    leaveEmbed.setColor(kyoukaColors.red);
    if (title) leaveEmbed.setTitle(title);
    if (subtitle) leaveEmbed.setDescription(subtitle);
    if (guildModel.leave_thumbnail)
        leaveEmbed.setThumbnail(guildModel.leave_thumbnail);
    if (footer) leaveEmbed.setFooter(footer);
    if (guildModel.leave_image) leaveEmbed.setImage(guildModel.leave_image);

    await leaveChannel.send(leaveEmbed);
}
