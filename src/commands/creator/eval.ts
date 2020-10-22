import { CommandInterface } from '../../types';
import { Client, Message } from 'discord.js';
import util from 'util';
import { config } from '../../config/config';

export default class Eval implements CommandInterface {
    public title = 'Eval';
    public description = 'Eval';
    public aliases = ['eval'];
    public args = '';
    public async run(message: Message, args: string[]) {
        // Crazy Diamond ID;
        if (message.author.id !== config.ownerID) return;

        try {
            const code = args.join(' ');
            let evaled = eval(code);

            if (typeof evaled !== 'string') evaled = util.inspect(evaled);

            message.channel.send(this.clean(evaled), { code: 'xl' });
        } catch (err) {
            message.channel.send(
                `\`ERROR\` \`\`\`xl\n${this.clean(err)}\n\`\`\``
            );
        }
    }

    clean(text: any) {
        if (typeof text === 'string')
            return text
                .replace(/`/g, '`' + String.fromCharCode(8203))
                .replace(/@/g, '@' + String.fromCharCode(8203));
        else return text;
    }
}
