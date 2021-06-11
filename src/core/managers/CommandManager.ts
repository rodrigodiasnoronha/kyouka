import fs from 'fs';
import path from 'path';
import { ICommand } from '../types';

export class CommandManager {
    /**
     *
     * Obtém todos os comandos de forma recursiva
     *
     */

    static getAllCommands(dirPath: string = path.resolve(__dirname, '..', 'commands'), arrayCommands: ICommand[] = []) {
        const files = fs.readdirSync(dirPath);
        arrayCommands = [...arrayCommands];

        for (const file of files) {
            const isDir = fs.statSync(`${dirPath}/${file}`).isDirectory();

            if (isDir) {
                arrayCommands = this.getAllCommands(`${dirPath}/${file}`, arrayCommands);
            } else {
                if (file.endsWith('.ts') || file.endsWith('.js')) {
                    let objectExported = require(`${dirPath}/${file}`);
                    let Command = objectExported.default as ICommand;
                    arrayCommands.push(Command);
                }
            }
        }

        return arrayCommands;
    }
}
