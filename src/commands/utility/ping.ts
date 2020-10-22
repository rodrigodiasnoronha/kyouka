import { CommandInterface } from '../../types';
import { Message, MessageEmbed } from 'discord.js';
import { kyoukaColors } from '../../utils/colors';
import { sendErrorMessage } from '../../utils/sendMessage';
import { errorReplies } from '../../utils/errorReplies';

export default class Ping implements CommandInterface {
    public title = 'Ping';
    public description = 'Ping e latência do server e da API';
    public args = '';
    public aliases = ['ping', 'latence'];
    public async run(message: Message, args: string[]) {
        try {
            const pingMessage = await message.channel.send('Pinging...');

            // @ts-ignore
            const { ping } = message.client;
            // @ts-ignore
            const serverLatency = pingMessage.createdAt - message.createdAt;
            const pingEmbed = new MessageEmbed()
                .setTitle('Ping')
                .setColor(kyoukaColors.pink)
                .addField('Server', `${serverLatency}ms`, true)
                .addField('API', `${Math.round(ping || 1)}ms`, true)
                .addField(
                    'Uptime',
                    this.msToTime(message.client.uptime || 0),
                    true
                );

            await pingMessage.edit(pingEmbed);
        } catch (err) {
            return sendErrorMessage(errorReplies.executingCommand, message);
        }
    }

    msToTime(ms: number) {
        let days = Math.floor(ms / 86400000); // 24*60*60*1000
        let daysms = ms % 86400000; // 24*60*60*1000
        let hours = Math.floor(daysms / 3600000); // 60*60*1000
        let hoursms = ms % 3600000; // 60*60*1000
        let minutes = Math.floor(hoursms / 60000); // 60*1000
        let minutesms = ms % 60000; // 60*1000
        let sec = Math.floor(minutesms / 1000);

        let str = '';
        if (days) str = str + days + 'd';
        if (hours) str = str + hours + 'h';
        if (minutes) str = str + minutes + 'm';
        if (sec) str = str + sec + 's';

        return str;
    }
}
