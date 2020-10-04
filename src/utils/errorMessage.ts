import { Message, MessageEmbed } from 'discord.js';

export const sendErrorMessage = (
    error: { errorMessage: string },
    message: Message
) => {
    const errorEmoji = message.client.emojis.cache.find(
        (emoji) => emoji.name === 'error'
    );

    return message.channel.send(`<:error:${errorEmoji}> ${error.errorMessage}`);
};
