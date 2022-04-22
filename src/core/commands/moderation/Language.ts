import { Message, PermissionString } from 'discord.js';

import { Bot } from '../../Bot';

import { BotCommand, BotCommandCategory, EMOJIS } from '../../types';

// entities
import type { GuildEntity } from '../../database/entities/GuildEntity';

// services
import { GuildService } from '../../services/GuildService';

export default class Language implements BotCommand {
    public aliases = ['language', 'idioma', 'lng'];
    public category: BotCommandCategory = BotCommandCategory.MODERATION;
    public permission: PermissionString[] = ['ADMINISTRATOR'];

    async execute(bot: Bot, message: Message, args: string[], guildEntity: GuildEntity): Promise<void> {
        const language = args[0];

        if (typeof language === 'string') {
            const isSupportedLang = bot.isSupportedLanguage(language);

            if (isSupportedLang) {
                const guildService = new GuildService();
                const newGuildEntity = await guildService.changeGuildLanguage(guildEntity, language);
                bot.setGuildInCollection(newGuildEntity);

                await message.react(EMOJIS.WHITE_CHECK_MARK);
            } else {
                await message.react(EMOJIS.X);
            }
        } else {
            const reply = bot.i18next.t('commands.language.messages.language', { lng: guildEntity.guild_language });
            await message.channel.send(reply);
        }
    }
}
