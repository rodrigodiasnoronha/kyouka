import { CommandInterface } from '../../types';
import { Client, Message, MessageEmbed } from 'discord.js';
import { Guild } from '../../database/entities/Guild';
import { createGuild } from '../../functions/createGuild';
import { sendErrorMessage, sendSuccessMessage } from '../../utils/sendMessage';
import { sendLeaveMessage } from '../../events/guildMemberRemove';
import { kyoukaColors } from '../../utils/colors';

export default class Leave implements CommandInterface {
    public title = 'Leave';
    public description =
        'Configure uma mensagem de adeus quando um usuário deixar o servidor';
    public args = '';
    public aliases = ['leave', 'adeus'];
    public async run(client: Client, message: Message, args: string[]) {
        if (message.channel.type === 'dm') return;

        const userHasPermission = message.member?.hasPermission(
            ['ADMINISTRATOR'],
            { checkAdmin: true, checkOwner: true }
        );

        if (!userHasPermission)
            return sendErrorMessage(
                {
                    errorMessage:
                        'Você precisa de permissão de administrador para executar este comando.',
                },
                message
            );

        let guild = await Guild.findOne({ guild_id: message.guild!.id });
        if (!guild) {
            guild = await createGuild(message.guild);
            if (!guild) return;
        }

        if (['ajuda', 'help'].includes(args[0]))
            return this.help(message, guild.prefix);

        if (!message.guild) return;

        if (['example', 'exemplo'].includes(args[0]))
            return sendLeaveMessage(
                client,
                guild,
                message.author,
                message.guild
            );

        // ativa/desativa o sistema de adeus
        if (['on', 'off'].includes(args[0])) {
            guild.leave_status = args[0] === 'on' ? 'on' : 'off';
            await guild.save();

            return sendSuccessMessage(
                `Sistema de adeus ${
                    args[0] === 'on' ? 'ativado' : 'desativado'
                } com sucesso.`,
                message
            );
        }

        if (['title', 'titulo', 'título'].includes(args[0])) {
            const [, ...titleMessageArray] = args;
            if (!titleMessageArray.length)
                return sendErrorMessage(
                    {
                        errorMessage: 'Você precisa digitar um título',
                    },
                    message
                );
            guild.leave_title = titleMessageArray.join(' ');
            await guild.save();

            return sendSuccessMessage(
                'Título da mensagem de adeus alterado com sucesso.',
                message
            );
        }

        if (['subtitle', 'subtitulo'].includes(args[0])) {
            const [, ...subtitlesArray] = args;
            if (!subtitlesArray.length)
                return sendErrorMessage(
                    {
                        errorMessage:
                            'Você precisa digitar um subtítulo para sua mensagem de adeus',
                    },
                    message
                );
            guild.leave_subtitle = subtitlesArray.join(' ');
            await guild.save();
            return sendSuccessMessage(
                'Subtítulo alterado com sucesso.',
                message
            );
        }

        // seta/atualiza o canal de adeus
        if (['channel', 'canal'].includes(args[0])) {
            const channel = message.mentions.channels.first();
            if (!channel)
                return sendErrorMessage(
                    {
                        errorMessage:
                            'Você precisa mencionar o canal de adeus.',
                    },
                    message
                );

            if (channel.type !== 'text')
                return sendErrorMessage(
                    {
                        errorMessage:
                            'É necessário mencionar um canal de texto como canal de adeus.',
                    },
                    message
                );

            guild.leave_channel = channel.id;
            await guild.save();
            return sendSuccessMessage(
                `<#${channel.id}> definido como canal de adeus com sucesso.`,
                message
            );
        }

        if (['footer', 'rodapé'].includes(args[0])) {
            const [, ...footerArray] = args;
            if (!footerArray.length) {
                guild.leave_footer = '';
                await guild.save();
                return sendSuccessMessage('Footer removido.', message);
            }
            guild.leave_footer = footerArray.join(' ');
            await guild.save();
            return sendSuccessMessage('Footer alterado com sucesso', message);
        }

        if (['thumbnail'].includes(args[0])) {
            if (['remove', 'remover'].includes(args[1])) {
                guild.leave_thumbnail = '';
                await guild.save();
                return sendSuccessMessage(
                    'Thumbnail removida com sucesso.',
                    message
                );
            }

            const image = message.attachments.array()[0];
            if (!image)
                return sendErrorMessage(
                    {
                        errorMessage:
                            'Você precisa carregar uma imagem junto com a mensagem',
                    },
                    message
                );
            // @ts-ignore
            if (image!.height > 400 || image!.width > 400)
                return sendErrorMessage(
                    {
                        errorMessage:
                            'Você não pode carregar uma imagem com uma dimensão maior que 400x400',
                    },
                    message
                );

            guild.leave_thumbnail = image.url;
            await guild.save();

            return sendSuccessMessage(
                'Thumbnail alterada com sucesso',
                message
            );
        }

        if (['image', 'imagem'].includes(args[0])) {
            if (['remove', 'remover'].includes(args[1])) {
                guild.leave_image = '';
                await guild.save();
                return sendSuccessMessage(
                    'Imagem de adeus removida com sucesso',
                    message
                );
            }

            const image = message.attachments.array()[0];
            if (!image)
                return sendErrorMessage(
                    {
                        errorMessage:
                            'Você precisa carregar uma imagem junto com a mensagem.',
                    },
                    message
                );

            guild.leave_image = image.url;
            await guild.save();
            return sendSuccessMessage('Imagem carregada com sucesso.', message);
        }

        const leaveStatus =
            guild.leave_status === 'on' ? 'Ativado' : 'Desativado';
        const leaveThumbnail = guild.leave_thumbnail ? 'Ativado' : 'Desativado';
        const leaveImage = guild.leave_image ? 'Ativado' : 'Desativado';
        const leaveChannel = guild.leave_channel
            ? `<#${guild.leave_channel}>`
            : 'Não definido';

        const leaveEmbed = new MessageEmbed()
            .setTitle('Mensagem de Adeus')
            .setColor(kyoukaColors.purple)
            .addField('Status', leaveStatus)
            .addField('Título', guild.leave_title)
            .addField('Subtítulo', guild.leave_subtitle || 'retirar isso')
            .addField('Canal de Adeus', leaveChannel)
            .addField('Imagem', leaveImage)
            .addField('Thumbnail', leaveThumbnail)
            .addField('Footer', guild.leave_footer || 'Não definido')
            .setFooter(`
               Digite \`${guild.prefix}leave ajuda\` para ver como configurar a mensagem de adeus no seu servidor.
            `);

        return message.channel.send(leaveEmbed);
    }

    help(message: Message, prefix: string) {
        const helpEmbed = new MessageEmbed()
            .setTitle('Ajuda - Mensagem Boas Vindas')
            .setColor(kyoukaColors.purple)
            .addField(
                prefix + 'leave on/off',
                'Ativar/desativar sistema de mensagens de adeus',
                false
            )
            .addField(
                prefix + 'leave title <mensagem>',
                'Define título da mensagem de adeus',
                false
            )
            .addField(
                prefix + 'leave subtitle <mensagem>',
                'Define o subtítulo da mensagem de adeus',
                false
            )
            .addField(
                prefix + 'leave channel <canal>',
                'Define o canal de mensagens de adeus',
                false
            )
            .addField(
                prefix + 'leave image',
                'Define a imagem fixada na mensagem na mensagem de adeus. É possível usar o argumento `remove` para remover a imagem da mensagem.',
                false
            )
            .addField(
                prefix + 'leave footer <mensagem>',
                'Footer da mensagem de adeus. Se vocẽ não passar um argumento, o footer será removido',
                false
            )
            .addField(
                prefix + 'leave thumbnail',
                'Define a imagem fixada na mensagem como Thumbnail da mensagem de adeus. Use o argumento `remove` para remover a thumbnail.'
            )
            .addField(
                prefix + 'leave example',
                'Envia uma mensagem de adeus como exemplo',
                false
            )
            .addField(
                'Variáveis',
                '`$user` Usuário\n`$user_id` ID do usuário\n`$member_count` Total de membros no servidor\n`$name` Nome de usuário\n`$server_name` Nome deste servidor',
                false
            );

        return message.channel.send(helpEmbed);
    }
}
