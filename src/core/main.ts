import 'dotenv/config';
import './database'

import { Bot } from './Bot'

const token = process.env.BOT_TOKEN as string;
const prefix = process.env.BOT_PREFIX as string

const bot = new Bot(token, prefix);
bot.start()