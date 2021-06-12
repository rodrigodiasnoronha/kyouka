import { Message } from 'discord.js';
import { Kyouka } from '../Kyouka';
import { GuildService } from '../services/GuildService';
import { CommandCategory } from '../types';

export async function onMessage(kyouka: Kyouka, message: Message) {
    if (message.author.bot || message.webhookID || !message.guild || message.channel.type != 'text') return;

    // salva se o servidor não estiver registrado
    let guild = kyouka.guildCollection.get(message.guild.id);
    if (!guild) {
        let guildService = new GuildService();
        guild = await guildService.findByDiscordGuild(message.guild);
        kyouka.guildCollection.set(guild._id, guild);
    }

    let prefix = guild.prefix;
    if (!message.content.startsWith(prefix)) return;

    let args = message.content.slice(prefix.length).trim().split(/ +/);
    // @ts-ignore
    let commandTyped = args.shift().toLowerCase();

    console.log(args, commandTyped);

    for (let command of kyouka.commands) {
        if (command.aliases.includes(commandTyped)) {
            let hasPermission = message.member?.hasPermission(command.permission, {
                checkAdmin: true,
                checkOwner: true,
            });

            switch (command.category) {
                case CommandCategory.ANIMATION:
                    await command.execute(kyouka, message, args);
                    break;

                case CommandCategory.MODERATION:
                    if (hasPermission) {
                        // executar comando
                    } else {
                        // msg q n tem permissão
                    }

                    break;

                case CommandCategory.DEVELOPER:
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
