import { PresenceData } from 'discord.js';

export const presences: PresenceData[] = [
    {
        status: 'dnd',
        activity: {
            type: 'LISTENING',
            name: 'As mensagens no servidor',
        },
    },
    {
        status: 'idle',
        activity: {
            type: 'WATCHING',
            name: 'Haikyuu',
        },
    },
    {
        status: 'online',
        activity: {
            type: 'PLAYING',
            name: 'Valorant',
        },
    },
    {
        status: 'online',
        activity: {
            type: 'PLAYING',
            name: 'Fallout 4',
        },
    },
    {
        status: 'online',
        activity: {
            type: 'LISTENING',
            name: 'As mensagens no seu servidor.',
        },
    },
];
