import { CommandInterface } from '../../types';
import { Client, EmbedFieldData, Message, MessageEmbed } from 'discord.js';
import { Guild } from '../../database/entities/Guild';
import { createGuild } from '../../functions/createGuild';
import { sendWelcomeMessage } from '../../events/guildMemberAdd';
import { sendErrorMessage, sendSuccessMessage } from '../../utils/sendMessage';
import { errorReplies } from '../../utils/errorReplies';
import { kyoukaColors } from '../../utils/colors';

export default class Welcome implements CommandInterface {
    public title = 'Welcome';
    public description =
        'Veja as suas configurações de mensagens de boas vindas';
    public args = '';
    public aliases = ['welcome', 'bv'];

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

        // Envia uma mensagem de exemplo no canal de boas vindas definido no servidor
        if (['example', 'exemplo'].includes(args[0]))
            return sendWelcomeMessage(
                client,
                guild,
                message.author,
                message.guild
            );

        // ativa/desativa o sistema de boas vindas
        if (['on', 'off'].includes(args[0])) {
            guild.welcome_status = args[0] === 'on' ? 'on' : 'off';
            await guild.save();

            return sendSuccessMessage(
                `Canal de boas vindas ${
                    args[0] === 'on' ? 'ativado' : 'desativado'
                } com sucesso.`,
                message
            );
        }

        // seta/atualiza o canal de boas vindas
        if (['channel', 'canal'].includes(args[0])) {
            const channel = message.mentions.channels.first();
            if (!channel)
                return sendErrorMessage(
                    {
                        errorMessage:
                            'Você precisa mencionar o canal de boas vindas.',
                    },
                    message
                );

            if (channel.type !== 'text')
                return sendErrorMessage(
                    {
                        errorMessage:
                            'É necessário mencionar um canal de texto como canal de boas vindas.',
                    },
                    message
                );

            guild.welcome_channel = channel.id;
            await guild.save();
            return sendSuccessMessage(
                `<#${channel.id}> definido como canal de boas vindas com sucesso.`,
                message
            );
        }

        if (['title', 'titulo', 'título'].includes(args[0])) {
            const [, ...titleMessageArray] = args;
            if (!titleMessageArray.length)
                return sendErrorMessage(
                    {
                        errorMessage:
                            'Você precisa digitar uma mensagem de boas vindas',
                    },
                    message
                );
            guild.welcome_title = titleMessageArray.join(' ');
            await guild.save();

            return sendSuccessMessage(
                'Título da mensagem de boas vindas alterado com sucesso.',
                message
            );
        }

        if (['subtitle', 'subtitulo'].includes(args[0])) {
            const [, ...subtitlesArray] = args;
            if (!subtitlesArray.length)
                return sendErrorMessage(
                    {
                        errorMessage:
                            'Você precisa digitar um subtítulo para sua mensagem de boas vindas',
                    },
                    message
                );
            guild.welcome_subtitle = subtitlesArray.join(' ');
            await guild.save();
            return sendSuccessMessage(
                'Subtítulo alterado com sucesso.',
                message
            );
        }

        if (['footer', 'rodapé'].includes(args[0])) {
            const [, ...footerArray] = args;
            if (!footerArray.length) {
                guild.welcome_footer = '';
                await guild.save();
                return sendSuccessMessage('Footer removido.', message);
            }
            guild.welcome_footer = footerArray.join(' ');
            await guild.save();
            return sendSuccessMessage('Footer alterado com sucesso', message);
        }

        if (['thumbnail'].includes(args[0])) {
            if (['remove', 'remover'].includes(args[1])) {
                guild.welcome_thumbnail = '';
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

            guild.welcome_thumbnail = image.url;
            await guild.save();

            return sendSuccessMessage(
                'Thumbnail alterada com sucesso',
                message
            );
        }

        if (['image', 'imagem'].includes(args[0])) {
            if (['remove', 'remover'].includes(args[1])) {
                guild.welcome_image = '';
                await guild.save();
                return sendSuccessMessage(
                    'Imagem de boas vindas removida com sucesso',
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

            guild.welcome_image = image.url;
            await guild.save();
            return sendSuccessMessage('Imagem carregada com sucesso.', message);
        }

        const welcomeStatus =
            guild.welcome_status === 'on' ? 'Ativado' : 'Desativado';
        const welcomeImage = guild.welcome_image ? 'Ativado' : 'Desativado';
        const welcomeChannel = guild.welcome_channel
            ? `<#${guild.welcome_channel}>`
            : 'Não definido';
        const welcomeThumbnail = guild.welcome_thumbnail
            ? 'Ativado'
            : 'Desativado';

        const welcomeEmbed = new MessageEmbed()
            .setTitle('Mensagem de Boas Vindas')
            .setColor(kyoukaColors.purple)
            .addField('Status', welcomeStatus)
            .addField('Título', guild.welcome_title)
            .addField('Subtítulo', guild.welcome_subtitle)
            .addField('Canal de boas vindas', welcomeChannel)
            .addField('Imagem', welcomeImage)
            .addField('Thumbnail', welcomeThumbnail)
            .addField('Footer', guild.welcome_footer || 'Não definido')
            .setFooter(`
               Digite \`${guild.prefix}welcome ajuda\` para ver como configurar a mensagem de boas vindas no seu servidor.
            `);

        return message.channel.send(welcomeEmbed);
    }

    help(message: Message, prefix: string) {
        const helpEmbed = new MessageEmbed()
            .setTitle('Ajuda - Mensagem Boas Vindas')
            .setColor(kyoukaColors.purple)
            .addField(
                prefix + 'welcome on/off',
                'Ativar/desativar sistema de boas vindas',
                false
            )
            .addField(
                prefix + 'welcome title <mensagem>',
                'Define título da mensagem de boas vindas',
                false
            )
            .addField(
                prefix + 'welcome subtitle <mensagem>',
                'Define o subtítulo da mensagem de boas vindas',
                false
            )
            .addField(
                prefix + 'welcome channel <canal>',
                'Define o canal de mensagens de boas vindas',
                false
            )
            .addField(
                prefix + 'welcome image',
                'Define a imagem fixada na mensagem na mensagem de boas Vindas. É possível usar o argumento `remove` para remover a imagem da mensagem.',
                false
            )
            .addField(
                prefix + 'welcome footer <mensagem>',
                'Footer da mensagem de boas vindas. Se vocẽ não passar um argumento, o footer será removido',
                false
            )
            .addField(
                prefix + 'welcome thumbnail',
                'Define a imagem fixada na mensagem como Thumbnail da mensagem de boas vindas. Use o argumento `remove` para remover a thumbnail.'
            )
            .addField(
                prefix + 'welcome example',
                'Envia uma mensagem de boas vindas de exemplo',
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
