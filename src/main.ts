import 'dotenv/config';
import { Client } from 'discord.js';
import { message } from './events/message';
import { databaseConnect } from './database';
import { guildMemberAdd } from './events/guildMemberAdd';

const client = new Client();

databaseConnect();

client.on('error', console.error);
client.on('warn', console.warn);
client.on('message', message);
client.on('guildMemberAdd', guildMemberAdd);

client.on('ready', () => console.log('bot is alive'));

client.login(process.env.BOT_TOKEN);
