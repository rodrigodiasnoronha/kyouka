import { Guild } from 'discord.js';
import { AppDataSource } from '../data-source';

import { GuildEntity } from '../entities/GuildEntity';

export const GuildRepository = AppDataSource.getRepository(GuildEntity).extend({
    async findOrCreateGuild(guild: Guild) {
        let guild_db = await this.findOne({ where: { guild_id: guild.id } });

        if (guild_db) {
            return guild_db;
        } else {
            guild_db = this.create({ guild_id: guild.id, guild_name: guild.name, guild_member_count: guild.memberCount });

            await this.save(guild_db);

            return guild_db;
        }
    },
});
