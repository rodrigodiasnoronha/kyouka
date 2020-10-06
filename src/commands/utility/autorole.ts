import { CommandInterface, GuildModelInterface } from '../../types';
import { Client, Message, MessageEmbed } from 'discord.js';
import { sendErrorMessage } from '../../utils/errorMessage';
import { errorReplies } from '../../utils/errorReplies';
import { Guild } from '../../database/entities/Guild';
import { createGuild } from '../../functions/createGuild';

export default class Autorole implements CommandInterface {
    public title = 'Autorole';
    public description =
        'Adiciona um cargo específico quando o usuário entrar no servidor.';
    public aliases = ['autorole'];
    public args = '@cargo';

    async run(client: Client, message: Message, args: string[]) {
        try {
            if (message.channel.type === 'dm') return;

            const userHasPermission = message.member?.hasPermission(
                ['ADMINISTRATOR'],
                {
                    checkAdmin: true,
                    checkOwner: true,
                }
            );

            if (!userHasPermission)
                return sendErrorMessage(errorReplies.permission, message);

            let guild = await Guild.findOne({ guild_id: message.guild?.id });
            if (!guild) {
                guild = await createGuild(message.guild);
                if (!guild) return;
            }

            if (args[0] === 'on' || args[0] === 'off') {
                await this.changeAutoroleStatus(args[0] === 'on', guild);
                return message.channel.send(
                    `O autorole foi ${
                        args[0] === 'on' ? 'ativado' : 'desativado'
                    } neste servidor.`
                );
            }

            if (args[0] === 'view') {
                if (guild.autorole_status !== 'on') {
                    return message.channel.send(
                        'O Autorole neste servidor está desativado.'
                    );
                }

                if (guild.autorole_id) {
                    const role = message.guild?.roles.cache.get(
                        guild.autorole_id
                    );
                    return message.channel.send(
                        `O cargo de autorole definido previamente: \`${role?.name}\``
                    );
                } else {
                    return message.channel.send(
                        `Não há nenhum cargo de autorole definido neste servidor.`
                    );
                }
            }

            const role = message.mentions.roles.first();
            if (!role) return this.helper(message);

            guild.autorole_status = 'on';
            guild.autorole_id = role.id;

            await guild.save();

            return message.channel.send(`
                :white_check_mark: Cargo de autorole definido com sucesso.
            `);
        } catch (err) {
            return this.helper(message);
        }
    }

    helper(message: Message) {
        const messageEmbed = new MessageEmbed().setTitle(
            ':book: Autorole - Info'
        ).setDescription(`
                Selecione um cargo para setar ao novos usuários quando eles entrarem no servidor.
               
                **autorole @cargo** 
                Adiciona o cargo de autorole.
                
                **autorole view**
                Visualize o cargo de autorole definido no servidor.
                
                **autorole on**
                Ativa o autorole dentro do seu servidor.
                
                **autorole off**
                Desativa a função de autorole no servidor
            `);

        return message.channel.send(messageEmbed);
    }

    async changeAutoroleStatus(status: boolean, guild: GuildModelInterface) {
        guild.autorole_status = status ? 'on' : 'off';
        await guild.save();
    }
}