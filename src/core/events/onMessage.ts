import { Message } from 'discord.js';

import { Bot } from '../Bot';

// services
import { GuildService } from '../services/GuildService';

// types
import { BotCommandCategory } from '../types';

export async function onMessage(bot: Bot, message: Message) {
    if (message.author.bot || message.webhookID || !message.guild || message.channel.type != 'text') return;

    // salva se o servidor não estiver registrado
    let guild = bot.guildCollection.get(message.guild.id);
    if (guild == undefined) {
        let guildService = new GuildService();

        try {
            guild = await guildService.findOrCreateGuild(message.guild);
            bot.guildCollection.set(guild.id, guild);
        } catch (err) {
            return await message.channel.send('erro ' + JSON.stringify(err))
        }
    }

    if (!message.content.startsWith(guild.guild_prefix)) return;

    const args = message.content.slice(guild.guild_prefix.length).trim().split(/ +/);
    const command = args.shift();
    const commandTyped = command ? command.toLowerCase() : '';

    for (let command of bot.commands) {
        if (command.aliases.includes(commandTyped)) {
            let hasPermission = message.member?.hasPermission(command.permission, {
                checkAdmin: true,
                checkOwner: true,
            });

            switch (command.category) {
                case BotCommandCategory.UTILTITY:
                    await command.execute(bot, message, args);
                    break;

                case BotCommandCategory.ANIMATION:
                    await command.execute(bot, message, args);
                    break;

                case BotCommandCategory.MODERATION:
                    if (hasPermission) {
                        // executar comando
                    } else {
                        // msg q n tem permissão
                    }

                    break;

                case BotCommandCategory.DEVELOPER:
                    let devId = process.env.DEVELOPER_DISCORD_ID as string;

                    if (message.author.id == devId) {
                        if (hasPermission) {
                            // executar comando
                        } else {
                            // mostrar msg q n possui permissão
                        }
                    }

                    break;
            }
        }
    }
}
