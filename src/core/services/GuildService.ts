import { Guild } from "discord.js";
import { GuildEntity } from "../database/entities/GuildEntity";
import { GuildRepository } from "../database/repositories/GuildRespository";

export class GuildService {
    private guildRepository;

    constructor() {
        this.guildRepository = GuildRepository
    }

    async findOrCreateGuild(guild: Guild): Promise<GuildEntity> {
        let guild_db = await this.guildRepository.findOne({ where: { guild_id: guild.id }});

        if (guild_db) {
            return guild_db
        } else {
            guild_db = this.guildRepository.create({ guild_id: guild.id, guild_name: guild.name, guild_member_count: guild.memberCount })

            await this.guildRepository.save(guild_db);
            
            return guild_db;
        }
    }
}