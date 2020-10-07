import { Client, Collection } from 'discord.js';
import { Guild } from '../database/entities/Guild';
import colors from 'colors';

export const ready = async (
    client: Client,
    prefixCollection: Collection<string, string>
) => {
    const guilds = await Guild.find();

    guilds.forEach((guild) => {
        prefixCollection.set(guild.guild_id, guild.prefix);
    });

    console.log(colors.rainbow('BOT IS ALIVE!'));
};
