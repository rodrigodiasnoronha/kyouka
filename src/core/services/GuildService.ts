import { Guild } from 'discord.js';
import { GuildRepository } from '../database/repositories/GuildRepository';

export class GuildService {
    private guildRepository: GuildRepository;

    constructor() {
        this.guildRepository = new GuildRepository();
    }

    async findByDiscordGuild(guild: Guild) {
        return await this.guildRepository.findByDiscordGuild(guild);
    }

    async findByGuildId(id: string) {
        return await this.guildRepository.findByGuildId(id);
    }
}
