import {CommandInterface} from "../../types";
import {Client, Message} from "discord.js";


export class Prefix implements CommandInterface {
    public title = 'Prefix';
    public description = 'Mude o meu prefixo no seu servidor!';
    public aliases = ['prefix', 'prefixo'];
    public args = 'new_prefix';
    public async run(client: Client, message: Message, args: string[]) {
        return message.channel.send('prefix');
    }
}