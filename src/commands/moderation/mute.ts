import { Client, Guild, Message, Role } from 'discord.js';
import { CommandInterface } from '../../types';
import { sendErrorMessage } from '../../utils/errorMessage';
import { errorReplies } from '../../utils/errorReplies';
import ms from 'ms';

export default class Mute implements CommandInterface {
    public title = 'Mute';
    public description = 'Silenciar alguém por algum tempo.';
    public aliases = ['mute', 'mutar', 'silenciar'];
    public args = '@user tempo motivo';

    async run(client: Client, message: Message, args: string[]) {
        const userHasPermission = message.member?.hasPermission([
            'MUTE_MEMBERS',
            'MANAGE_ROLES',
        ]);

        if (!userHasPermission)
            return sendErrorMessage(errorReplies.permission, message);

        // verifica o bot tem permissão suficiente
        const botHasPermission = message.guild?.me?.hasPermission([
            'MUTE_MEMBERS',
            'MANAGE_ROLES',
        ]);
        if (!botHasPermission)
            return sendErrorMessage(errorReplies.botPermission, message);

        // verifica se houve algum usuário marcado no commando
        const user = message.mentions.users.first();
        if (!user) return sendErrorMessage(errorReplies.mentionUser, message);

        // tempo de mute;
        const muteTime = args[1];
        const isValidTime = this.isMuteTimeValid(muteTime);

        if (!isValidTime)
            return sendErrorMessage(errorReplies.incorrectSintax, message);
        const timeInMilliseconds = ms(muteTime);

        let muteRole = message.guild?.roles.cache.find(
            (role) => role.name === 'Kyouka Mute'
        );
        if (!muteRole) {
            muteRole = await this.createMuteRole(client, message.guild);
        }
        if (!muteRole) return;

        // Sobrescreve as regras de outros cargos para o mute
        message.guild?.channels.cache.forEach(async (channel, id) => {
            await channel.createOverwrite(muteRole as Role, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false,
            });
        });

        message.guild?.member(user)?.roles.add(muteRole!.id);
        message.channel.send(
            `:white_check_mark: ${user.username} baka! Você foi mutado!`
        );

        setTimeout(() => {
            message.guild?.member(user)?.roles.remove(muteRole!.id);
        }, timeInMilliseconds);
    }

    async createMuteRole(client: Client, guild: Guild | null) {
        return await client.guilds.cache.get(guild!.id)?.roles.create({
            data: {
                name: 'Kyouka Mute',
                color: '#cccccc',
                permissions: [],
                mentionable: false,
            },
        });
    }

    isMuteTimeValid(muteTime: string) {
        const arrayTimePeriod = ['m', 's', 'd', 'h', 'y'];

        return !(
            isNaN(
                Number.parseInt(muteTime.substring(0, muteTime.length - 1))
            ) &&
            arrayTimePeriod.includes(
                muteTime.substring(muteTime.length - 1, muteTime.length)
            )
        );
    }
}
