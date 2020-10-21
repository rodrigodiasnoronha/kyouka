import { Client, Message, MessageEmbed } from 'discord.js';
import { Guild } from '../../database/entities/Guild';
import { CommandInterface } from '../../types';
import { errorReplies } from '../../utils/errorReplies';
import { sendErrorMessage, sendSuccessMessage } from '../../utils/sendMessage';
import { createGuild } from '../../functions/createGuild';

export default class Log implements CommandInterface {
    public title = 'Log';
    public description = 'Veja e configure o sistema de logs no seu servidor';
    public aliases = ['log', 'logs'];
    public args = 'channel';
    public async run(client: Client, message: Message, args: string[]) {
        if (message.channel.type === 'dm') return;
        const userHasPermission = message.member?.hasPermission(
            ['ADMINISTRATOR'],
            { checkAdmin: true, checkOwner: true }
        );
        if (!userHasPermission)
            return sendErrorMessage(errorReplies.permission, message);

        let guild = await Guild.findOne({ guild_id: message.guild!.id });

        if (!guild) {
            guild = await createGuild(message.guild);
            if (!guild) return;
        }

        // mostra embed de ajuda
        if (['ajuda', 'help'].includes(args[0])) {
            return this.help(message, guild.prefix);
        }

        // ativa/desativa logs
        if (['on', 'off'].includes(args[0])) {
            guild.log_status = args[0] === 'on' ? 'on' : 'off';
            await guild.save();
            return sendSuccessMessage(
                `Logs no servidor ${
                    args[0] === 'on' ? 'Ativado' : 'Desativado'
                } com sucesso.`,
                message
            );
        }

        // muda canal de logs
        if (['channel', 'canal'].includes(args[0])) {
            const channel = message.mentions.channels.first();
            if (!channel)
                return sendErrorMessage(
                    {
                        errorMessage: 'Você precisa mencionar um canal.',
                    },
                    message
                );

            guild.log_channel = channel.id;
            await guild.save();
            return sendSuccessMessage(
                `Canal <#${channel.id}> definido como canal de logs com sucesso.`,
                message
            );
        }

        const logStatus = guild.log_status === 'on' ? 'Ativado' : 'Desativado';
        const logChannel = guild.log_channel
            ? `<#${guild.log_channel}>`
            : 'Não definido';

        const logEmbed = new MessageEmbed()
            .setTitle('Logs do Servidor')
            .addField('Status', logStatus)
            .addField('Canal de Logs', logChannel)
            .setFooter(
                `Digite *${guild.prefix}log ajuda* para ver como configurar o sistema de logs no seu servidor.`
            );

        return message.channel.send(logEmbed);
    }

    help(message: Message, prefix: string) {
        const helpEmbed = new MessageEmbed()
            .setTitle('Ajuda - Mensagem Boas Vindas')
            .addField(
                prefix + 'log on/off',
                'Ativar/desativar sistema de logs',
                false
            )
            .addField(
                prefix + 'log channel <canal>',
                'Define o canal de logs no seu servidor'
            );

        return message.channel.send(helpEmbed);
    }
}
