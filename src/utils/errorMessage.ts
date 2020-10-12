import { Message, MessageEmbed } from 'discord.js';

export const sendErrorMessage = (
    error: { errorMessage: string },
    message: Message
) => {
    const messageEmbed = new MessageEmbed()
        .setDescription(`<@${message.author}> ${error.errorMessage}`)
        .setColor('#f44336');
    return message.channel.send(messageEmbed);
};

export const sendSucessMessage = (sucessMessage: string, message: Message) => {
    const messageEmbed = new MessageEmbed()
        .setDescription(`<@${message.author}> ${sucessMessage}`)
        .setColor('#00e676');

    return message.channel.send(messageEmbed);
};
