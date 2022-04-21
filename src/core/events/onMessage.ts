import { Message } from 'discord.js';
import { Bot } from '../Bot';
// import { GuildService } from '../services/GuildService';
import { BotCommandCategory } from '../types';

export async function onMessage(bot: Bot, message: Message) {
    if (message.author.bot || message.webhookID || !message.guild || message.channel.type != 'text') return;

    // salva se o servidor não estiver registrado
    // let guild = kyouka.guildCollection.get(message.guild.id);
    // if (!guild) {
    //     let guildService = new GuildService();
    //     guild = await guildService.findByDiscordGuild(message.guild);
    //     kyouka.guildCollection.set(guild._id, guild);
    // }

    const prefix = process.env.BOT_PREFIX as string;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift();
    const commandTyped = command ? command.toLowerCase() : '';

    
    

    for (let command of bot.commands) {
        if (command.aliases.includes(commandTyped)) {
            let hasPermission = message.member?.hasPermission(command.permission, {
                checkAdmin: true,
                checkOwner: true,
            });

            switch (command.category) {
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