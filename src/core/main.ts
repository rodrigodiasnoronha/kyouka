import 'dotenv/config';

import { Bot } from './Bot'

const token = process.env.BOT_TOKEN as string;

const bot = new Bot(token);
bot.start()