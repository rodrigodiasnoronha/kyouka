import 'dotenv/config';
import { Client, Collection } from 'discord.js';
import { message } from './events/message';
import { databaseConnect } from './database';
import { guildMemberAdd } from './events/guildMemberAdd';
import { ready } from './events/ready';
import { guildCreate } from './events/guildCreate';
import { presences } from './utils/presences';
import { guildMemberRemove } from './events/guildMemberRemove';
import { guildBanAdd } from './events/guildBanAdd';
import { guildBanRemove } from './events/guildBanRemove';
import { messageDelete } from './events/messageDelete';
import { messageUpdate } from './events/messageUpdate';

const client = new Client();

databaseConnect().then(() => {});

// Collections
const prefixCollection = new Collection<string, string>();

client.on('ready', async () => {
    await ready(client, prefixCollection);

    const presence = presences[Math.floor(Math.random() * presences.length)];
    client.user?.setPresence(presence);
    setInterval(() => {
        const presence =
            presences[Math.floor(Math.random() * presences.length)];
        client.user?.setPresence(presence);
    }, 1000 * 60 * 60 * 20);
});

client.on('error', console.error);
client.on('warn', console.warn);
client.on('guildCreate', guildCreate);
client.on('guildMemberAdd', guildMemberAdd);
client.on('guildMemberRemove', guildMemberRemove);
client.on('guildBanRemove', guildBanRemove);
client.on('messageDelete', messageDelete);
client.on('messageUpdate', messageUpdate);
client.on('guildBanAdd', guildBanAdd);
client.on('message', async (messageSent) => {
    await message(messageSent, prefixCollection);
});

client.login(process.env.BOT_TOKEN);
