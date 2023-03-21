import 'dotenv/config'; // import necessário pra usar comandos da cli do typeorm
import { DataSource } from 'typeorm';


const DB_NAME = process.env.DB_NAME as string;
const DB_PASS = process.env.DB_PASS as string;
const DB_USERNAME = process.env.DB_USER as string;
const DB_PORT = process.env.DB_PORT as string;
const DB_HOST = process.env.DB_HOST as string;

/**
 *
 * Database connection config
 *
 */

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: DB_HOST,
    port: parseInt(DB_PORT),
    username: DB_USERNAME,
    password: DB_PASS,
    database: DB_NAME,
    synchronize: true,
    logging: true,
    entities: [__dirname + '/entities/*{.js,.ts}'],
    migrations: [__dirname + '/migrations/*{.js,.ts}'],
    subscribers: [],
});
