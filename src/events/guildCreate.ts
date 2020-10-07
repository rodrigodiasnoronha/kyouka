import { Guild } from 'discord.js';
import { createGuild } from '../functions/createGuild';

export const guildCreate = async (guild: Guild) => {
    await createGuild(guild);
};
