import { CommandInterface } from '../../types';
import { Client, Message } from 'discord.js';
import { sendErrorMessage, sendSuccessMessage } from '../../utils/sendMessage';
import { timeOutAsync } from '../../utils/timeOutAsync';

export default class Jankenpon implements CommandInterface {
    public title = 'Jankenpon';
    public description = 'Jogue jankenpon comigo!';
    public args = 'pedra | papel | tesoura';
    public aliases = ['jankenpon', 'jkp', 'ppt'];

    public async run(client: Client, message: Message, args: string[]) {
        const validOptions = ['tesoura', 'papel', 'pedra'];

        const optionSelected = args[0].toLocaleLowerCase();

        if (!optionSelected || !validOptions.includes(optionSelected))
            return sendErrorMessage(
                {
                    errorMessage:
                        'Você precisa digitar `pedra` ou `papel` ou `tesoura` como argumento!',
                },
                message
            );

        const botOption =
            validOptions[Math.floor(Math.random() * validOptions.length)];

        let messageSent = await message.channel.send('JAN');
        await timeOutAsync(1000);
        messageSent = await messageSent.edit('JAN\nKEN');
        await timeOutAsync(1000);
        messageSent = await messageSent.edit('JAN\nKEN\nPON');

        const userEmoji =
            optionSelected === 'tesoura'
                ? ':v:'
                : optionSelected === 'papel'
                ? ':hand_splayed:'
                : ':fist:';
        const botEmoji =
            botOption === 'tesoura'
                ? ':v:'
                : botOption === 'papel'
                ? ':hand_splayed:'
                : ':fist:';

        let winner = 'Você ganhou!';
        if (botOption === optionSelected) winner = 'Empate!';

        if (
            (botOption === 'pedra' && optionSelected === 'tesoura') ||
            (botOption === 'tesoura' && optionSelected === 'papel') ||
            (botOption === 'papel' && optionSelected === 'pedra')
        ) {
            winner = 'Você perdeu!';
        }

        await messageSent.edit(
            `JAN\nKEN\nPON\n${userEmoji} x ${botEmoji}\n${winner}`
        );
    }
}
