import { PresenceData } from 'discord.js';
import { Kyouka } from '../Kyouka';

export async function onReady(kyouka: Kyouka) {
    const presences: PresenceData[] = [
        {
            status: 'online',
            activity: {
                name: `As mensagens de ${kyouka.client.guilds.cache.size} servidores`,
                type: 'WATCHING',
            },
        },
        {
            status: 'online',
            activity: {
                name: `Lendo as mensagens de meus ${kyouka.client.users.cache.size} usuários`,
                type: 'PLAYING',
            },
        },
    ];

    const presence = presences[Math.floor(Math.random() * presences.length)];

    try {
        await kyouka.client.user?.setPresence(presence);

        setInterval(async () => {
            const presence = presences[Math.floor(Math.random() * presences.length)];
            await kyouka.client.user?.setPresence(presence);
        }, 1000 * 60 * 10); // update presence in 10 minutes
    } catch (error) {
        // error
    } finally {
        console.log('Kyouka - iniciada com sucesso');
    }
}
