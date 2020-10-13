import { CommandInterface } from '../../types';
import { Client, Collection, Message } from 'discord.js';
import {sendErrorMessage, sendSucessMessage} from '../../utils/sendMessage';
import { errorReplies } from '../../utils/errorReplies';
import { Guild } from '../../database/entities/Guild';
import { createGuild } from '../../functions/createGuild';

export class Prefix implements CommandInterface {
    public title = 'Prefix';
    public description = 'Mude o meu prefixo no seu servidor!';
    public aliases = ['prefix', 'prefixo'];
    public args = 'new_prefix';

    public async run(
        client: Client,
        message: Message,
        args: string[],
        prefixCollection: Collection<string, string>
    ) {
        const userHasPermission = message.member?.hasPermission([
            'ADMINISTRATOR',
        ]);
        if (!userHasPermission)
            return sendErrorMessage(errorReplies.permission, message);

        const newPrefix = args[0];
        if (!newPrefix)
            return sendErrorMessage(errorReplies.newPrefixError, message);

        if (newPrefix.length > 2)
            return sendErrorMessage(
                {
                    errorMessage:
                        'O novo prefixo não pode ter mais do que 2 caracteres.',
                },
                message
            );

        let guild = await Guild.findOne({ guild_id: message.guild!.id });
        if (!guild) {
            guild = await createGuild(guild);
            if (!guild) return;
        }

        guild.prefix = newPrefix;
        await guild.save();

        prefixCollection.set(message.guild!.id, newPrefix);
        return sendSucessMessage(
            `Prefixo do servidor alterado com sucesso para \`${newPrefix}\``, message
        )
    }
}
