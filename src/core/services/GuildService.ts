import { Guild } from 'discord.js';
import { GuildEntity } from '../database/entities/GuildEntity';
import { GuildRepository } from '../database/repositories/GuildRespository';

export class GuildService {
    private guildRepository;

    constructor() {
        this.guildRepository = GuildRepository;
    }

    async findOrCreateGuild(guild: Guild): Promise<GuildEntity> {
        return await this.guildRepository.findOrCreateGuild(guild);
    }

    async changeGuildLanguage(guildEntity: GuildEntity, language: string): Promise<GuildEntity> {
        return await this.guildRepository.changeGuildLanguage(guildEntity, language);
    }
}
