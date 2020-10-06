import 'dotenv/config';
import { Client, Collection } from 'discord.js';
import { message } from './events/message';
import { databaseConnect } from './database';
import { guildMemberAdd } from './events/guildMemberAdd';
import { ready } from './events/ready';

const client = new Client();

databaseConnect().then(() => {});

// Collections
const prefixCollection = new Collection<string, string>();

client.on('ready', async () => {
    await ready(client, prefixCollection);
});

client.on('error', console.error);
client.on('warn', console.warn);
client.on('message', async (messageSent) => {
    await message(messageSent, prefixCollection);
});
client.on('guildMemberAdd', guildMemberAdd);

client.login(process.env.BOT_TOKEN);
