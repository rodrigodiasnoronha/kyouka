import { PresenceData } from 'discord.js';

import colors from 'colors';

import { Bot } from '../Bot';

export async function onReady(bot: Bot) {
    const presences: PresenceData[] = [
        {
            status: 'online',
            activity: {
                name: `One Piece Openings`,
                type: 'LISTENING',
            }
        },
    ];

    const presence = presences[Math.floor(Math.random() * presences.length)];

    try {
        await bot.client.user?.setPresence(presence);

        setInterval(async () => {
            const presence = presences[Math.floor(Math.random() * presences.length)];
            await bot.client.user?.setPresence(presence);
        }, 1000 * 60 * 10); // update presence in 10 minutes

        console.log(colors.green('Bot Started'));
    } catch (err) {
        console.log(colors.red('Error while starting bot'), err);
    }
}
