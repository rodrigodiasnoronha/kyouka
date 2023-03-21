import fs from 'fs';
import path from 'path';

import { BotCommand } from '../types';

export class CommandManager {
    /**
     *
     * Get all commands from ../commands with recursivity
     *
     */
    static getAllCommands(
        dirPath: string = path.resolve(__dirname, '..', 'commands'),
        arrayCommands: BotCommand[] = []
    ): BotCommand[] {
        const files = fs.readdirSync(dirPath);
        arrayCommands = [...arrayCommands];

        for (const file of files) {
            const isDir = fs.statSync(`${dirPath}/${file}`).isDirectory();

            if (isDir) {
                arrayCommands = this.getAllCommands(
                    `${dirPath}/${file}`,
                    arrayCommands
                );
            } else {
                if (file.endsWith('.ts') || file.endsWith('.js')) {
                    const objectExported = require(`${dirPath}/${file}`);
                    const botCommand = new objectExported.default();
                    arrayCommands.push(botCommand);
                }
            }
        }

        return arrayCommands;
    }
}
