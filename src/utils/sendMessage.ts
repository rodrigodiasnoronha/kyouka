import { Message, MessageEmbed } from 'discord.js';
import { kyoukaColors } from './colors';

export const sendErrorMessage = (
    error: { errorMessage: string },
    message: Message
) => {
    const messageEmbed = new MessageEmbed()
        .setDescription(`<@${message.author}> ${error.errorMessage}`)
        .setColor(kyoukaColors.red);
    return message.channel.send(messageEmbed);
};

export const sendSuccessMessage = (
    successMessage: string,
    message: Message
) => {
    const messageEmbed = new MessageEmbed()
        .setDescription(successMessage)
        .setColor(kyoukaColors.green);

    return message.channel.send(messageEmbed);
};
