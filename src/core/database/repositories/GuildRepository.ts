import { Guild } from 'discord.js';
import { Guild as GuildEntity } from '../entities/Guild';

export class GuildRepository {
    async findByDiscordGuild(guild: Guild) {
        let guildFound = await GuildEntity.findOne({ guild_id: guild.id });

        if (guildFound) {
            return guildFound;
        }

        return await GuildEntity.create({
            guild_name: guild.name,
            guild_id: guild.id,
            prefix: process.env.BOT_PREFIX || '.',
            memberCount: guild.memberCount,
        });
    }

    async findByGuildId(id: string) {
        return GuildEntity.findOne({ guild_id: id });
    }
}
