import { Message } from 'discord.js';
const prefix = process.env.BOT_PREFIX || '.';

// moderation commands
import Ban from '../commands/moderation/ban';
import Clear from '../commands/moderation/clear';
import Kick from '../commands/moderation/kick';
import Mute from '../commands/moderation/mute';
import Nickname from '../commands/moderation/nickname';
import { Unmute } from '../commands/moderation/unmute';
import Embed from '../commands/utility/embed';

// commands instance
const ban = new Ban();
const mute = new Mute();
const unmute = new Unmute();
const kick = new Kick();
const nickname = new Nickname();
const clear = new Clear();
const embed = new Embed();

export const message = async (message: Message) => {
    if (message.author.bot) return;

    if (!message.content.toLowerCase().startsWith(prefix)) return;

    if (message.webhookID) return;

    /**
     *
     * args = argumentos passados na mensagem
     * command = comando usado
     *
     */

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift()?.toLowerCase() || '';

    if (!command || command.startsWith('.')) return;

    if (ban.aliases.includes(command))
        return ban.run(message.client, message, args);

    if (mute.aliases.includes(command))
        return mute.run(message.client, message, args);

    if (unmute.aliases.includes(command))
        return unmute.run(message.client, message, args);

    if (kick.aliases.includes(command))
        return kick.run(message.client, message, args);

    if (nickname.aliases.includes(command))
        return nickname.run(message.client, message, args);

    if (clear.aliases.includes(command))
        return clear.run(message.client, message, args);

    if (embed.aliases.includes(command))
        return embed.run(message.client, message, args);
};
