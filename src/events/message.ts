import { Collection, Message } from 'discord.js';
// moderation commands
import Ban from '../commands/moderation/ban';
import Clear from '../commands/moderation/clear';
import Kick from '../commands/moderation/kick';
import Mute from '../commands/moderation/mute';
import Nickname from '../commands/moderation/nickname';
import Unmute from '../commands/moderation/unmute';
import Embed from '../commands/utility/embed';
import Autorole from '../commands/utility/autorole';
import Prefix from '../commands/moderation/prefix';
import SayCommand from '../commands/utility/say';
import EightBall from '../commands/utility/8ball';
import CryCommand from '../commands/funny/cry';
import HelpCommand from '../commands/utility/help';
import Thinking from '../commands/funny/thinking';
import Jankenpon from '../commands/utility/jankenpon';
import Sad from '../commands/funny/sad';
import Attack from '../commands/funny/attack';
import Level from '../commands/leveling/level';
import Welcome from '../commands/config/Welcome';
import Changelog from '../commands/utility/changelog';
import Leave from '../commands/config/Leave';
import Log from '../commands/config/Log';
import Lgbt from '../commands/utility/lgbt';
import Gay from '../commands/utility/gay';
import Communism from '../commands/utility/communism';
import Chat from '../commands/moderation/chat';
import ChannelSync from '../commands/moderation/channelsync';
import Kavatar from '../commands/creator/kavatar';
import Support from '../commands/utility/support';
import Userinfo from '../commands/utility/userinfo';
import Eval from '../commands/creator/eval';
import Ping from '../commands/utility/ping';
import { sendSuccessMessage } from '../utils/sendMessage';
import Prune from '../commands/moderation/prune';
import Invite from '../commands/utility/invite';
import GuildIcon from '../commands/utility/guildicon';
import Avatar from '../commands/utility/avatar';

// commands instance
const ban = new Ban();
const mute = new Mute();
const unmute = new Unmute();
const kick = new Kick();
const nickname = new Nickname();
const clear = new Clear();
const embed = new Embed();
const autorole = new Autorole();
const prefixCommand = new Prefix();
const sayCommand = new SayCommand();
const eightBallCommand = new EightBall();
const cryCommand = new CryCommand();
const helpCommand = new HelpCommand();
const thinkingCommand = new Thinking();
const jankenponCommand = new Jankenpon();
const sadCommand = new Sad();
const attackCommand = new Attack();
const levelCommand = new Level();
const welcomeCommand = new Welcome();
const changelogCommand = new Changelog();
const leaveCommand = new Leave();
const logCommand = new Log();
const lgbtCommand = new Lgbt();
const gayCommand = new Gay();
const communismCommand = new Communism();
const chatCommand = new Chat();
const channelSync = new ChannelSync();
const kavatar = new Kavatar();
const support = new Support();
const userInfo = new Userinfo();
const evalCommand = new Eval();
const pingCommand = new Ping();
const prune = new Prune();
const invite = new Invite();
const guildIcon = new GuildIcon();
const avatar = new Avatar();

const defaultPrefix = process.env.BOT_PREFIX as string;

export const message = async (
    message: Message,
    prefixCollection: Collection<string, string>
) => {
    if (message.author.bot || message.webhookID) return;

    /**
     *
     * Verificações do prefixo do servidor
     *
     * */

    let prefix = message.guild
        ? prefixCollection.get(message.guild.id)
        : defaultPrefix;

    if (!prefix) {
        prefix = defaultPrefix;
    }

    // envia uma mensagem caso o BOT seja mecionado;
    if (!message.content.toLowerCase().startsWith(prefix)) {
        if (message.mentions.has(message.client.user!.id)) {
            return sendSuccessMessage(
                `Olá, <@${message.author}>! Se quiser saber sobre meus comandos, digite \`${prefix}ajuda\`.`,
                message
            );
        }
        return;
    }

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

    if (autorole.aliases.includes(command))
        return autorole.run(message.client, message, args);

    if (prefixCommand.aliases.includes(command))
        return prefixCommand.run(
            message.client,
            message,
            args,
            prefixCollection
        );

    if (sayCommand.aliases.includes(command))
        return sayCommand.run(message.client, message, args);

    if (eightBallCommand.aliases.includes(command))
        return eightBallCommand.run(message.client, message, args);

    if (cryCommand.aliases.includes(command))
        return cryCommand.run(message.client, message, args);

    if (helpCommand.aliases.includes(command))
        return helpCommand.run(message.client, message, args);

    if (thinkingCommand.aliases.includes(command))
        return thinkingCommand.run(message.client, message, args);

    if (jankenponCommand.aliases.includes(command))
        return jankenponCommand.run(message.client, message, args);

    if (sadCommand.aliases.includes(command))
        return sadCommand.run(message.client, message, args);

    if (attackCommand.aliases.includes(command))
        return attackCommand.run(message.client, message, args);

    if (levelCommand.aliases.includes(command))
        return levelCommand.run(message.client, message, args);

    if (welcomeCommand.aliases.includes(command))
        return welcomeCommand.run(message.client, message, args);

    if (leaveCommand.aliases.includes(command))
        return leaveCommand.run(message.client, message, args);

    if (changelogCommand.aliases.includes(command))
        return changelogCommand.run(message.client, message, args);

    if (logCommand.aliases.includes(command))
        return logCommand.run(message.client, message, args);

    if (lgbtCommand.aliases.includes(command))
        return lgbtCommand.run(message.client, message, args);

    if (gayCommand.aliases.includes(command))
        return gayCommand.run(message.client, message, args);

    if (communismCommand.aliases.includes(command))
        return communismCommand.run(message.client, message, args);

    if (chatCommand.aliases.includes(command))
        return chatCommand.run(message.client, message, args);

    if (channelSync.aliases.includes(command))
        return channelSync.run(message.client, message, args);

    if (support.aliases.includes(command))
        return support.run(message.client, message, args);

    if (userInfo.aliases.includes(command))
        return userInfo.run(message.client, message, args);

    if (kavatar.aliases.includes(command)) return kavatar.run(message, args);

    if (evalCommand.aliases.includes(command))
        return evalCommand.run(message, args);

    if (pingCommand.aliases.includes(command))
        return pingCommand.run(message, args);

    if (prune.aliases.includes(command)) return prune.run(message, args);

    if (invite.aliases.includes(command)) return invite.run(message, args);

    if (guildIcon.aliases.includes(command))
        return guildIcon.run(message, args);

    if (avatar.aliases.includes(command)) return avatar.run(message, args);
};
