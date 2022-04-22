import fs from 'fs';
import path from 'path';

import { Language } from '../types';

export class LanguageManager {
    /**
     *
     * Get all languages from ../resources/locales with recursivity
     *
     */
    static getSupportedLanguages(
        dirPath: string = path.resolve(__dirname, '..', 'resources', 'locales'),
        arrayLanguages: string[] = []
    ): string[] {
        const files = fs.readdirSync(dirPath);
        arrayLanguages = [...arrayLanguages];

        for (const file of files) {
            const isDir = fs.statSync(`${dirPath}/${file}`).isDirectory();

            if (isDir) {
                arrayLanguages = this.getSupportedLanguages(`${dirPath}/${file}`, arrayLanguages);
            } else {
                if (file.endsWith('.json')) {
                    const lang = require(`${dirPath}/${file}`);
                    arrayLanguages.push(lang.name);
                }
            }
        }

        return arrayLanguages;
    }

    static isSupportedLang(lang: string, arraySupportedLanguages: string[]) {
        return arraySupportedLanguages.includes(lang);
    }
}
