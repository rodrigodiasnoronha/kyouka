import { CommandInterface } from '../../types';
import { icons } from '../../utils/icons';
import fs from 'fs';
import path from 'path';
import {
    Client,
    Message,
    MessageEmbed,
    MessageReaction,
    User,
} from 'discord.js';
import { kyoukaColors } from '../../utils/colors';

export default class HelpCommand implements CommandInterface {
    public title = 'Help';
    public description = 'Meu painel de ajuda';
    public aliases = ['ajuda', 'help', 'commands', 'comandos'];
    public args = '';

    public async run(client: Client, message: Message, args: string[]) {
        const embed = new MessageEmbed()
            .setTitle('Kyouka - Ajuda')
            .setDescription(
                `
            Abaixo você pode ver as categorias de comandos que eu possuo.
            
            :police_officer: **Moderação**
            
            :fire: **Diversão**
            
            :tools: **Utilidades**

            :question: **Sobre mim**
        `
            )
            .setThumbnail(icons.questionIcon);

        const messageSent = await message.channel.send(embed);

        await messageSent.react('👮');
        await messageSent.react('🔥');
        await messageSent.react('🛠️');
        await messageSent.react('❓');

        const validsReactEmojis = ['👮', '🔥', '🛠️', '❓'];
        const reactionFilter = (reaction: MessageReaction, userReact: User) =>
            validsReactEmojis.includes(reaction.emoji.name) &&
            userReact.id === message.author.id;

        const collector = await messageSent.createReactionCollector(
            reactionFilter,
            {
                time: 60000,
            }
        );

        collector.on('collect', async (reaction, userReact) => {
            switch (reaction.emoji.name) {
                case '🔥':
                    await messageSent.edit(this.showsFunnyEmbed());
                    break;
                case '🛠️':
                    await messageSent.edit(this.showsUtilityEmbed());
                    break;
                case '👮':
                    await messageSent.edit(this.showsModerationEmbed());
                    break;
                case '❓':
                    await messageSent.edit(this.showsQuestionEmbed());
                    break;
            }
        });

        collector.on('end', async () => {
            await messageSent.reactions.removeAll();
        });
    }

    showsModerationEmbed(): MessageEmbed {
        const moderationCommandFiles = fs
            .readdirSync(path.resolve(__dirname, '..', 'moderation'))
            .filter((file) => file.endsWith('.js') || file.endsWith('.ts'));

        const moderationCommandList = new Array<CommandInterface>();

        moderationCommandFiles.forEach((file) => {
            const command = require(`../moderation/${file}`);
            if (!file) return;
            const instance = new command.default();
            moderationCommandList.push(instance);
        });

        const moderationCommandsEmbed = new MessageEmbed()
            .setTitle('Comandos - Moderação')
            .setThumbnail(icons.questionIcon);

        moderationCommandList.forEach((command) => {
            moderationCommandsEmbed.addField(
                command.title.toLowerCase(),
                command.description
            );
        });

        return moderationCommandsEmbed;
    }

    showsFunnyEmbed(): MessageEmbed {
        const funnyCommandsFiles = fs
            .readdirSync(path.resolve(__dirname, '..', 'funny'))
            .filter((file) => file.endsWith('.js') || file.endsWith('.ts'));

        const utilityCommandList = new Array<CommandInterface>();

        funnyCommandsFiles.forEach((file) => {
            const command = require(`../funny/${file}`);
            if (!file) return;
            const instance = new command.default();
            utilityCommandList.push(instance);
        });

        const funnyCommandsEmbed = new MessageEmbed()
            .setTitle('Comandos - Diversão')
            .setThumbnail(icons.questionIcon);

        utilityCommandList.forEach((command) => {
            funnyCommandsEmbed.addField(
                command.title.toLowerCase(),
                command.description
            );
        });

        return funnyCommandsEmbed;
    }

    showsUtilityEmbed(): MessageEmbed {
        const utilityCommandFiles = fs
            .readdirSync(path.resolve(__dirname, '..', 'utility'))
            .filter((file) => file.endsWith('.js') || file.endsWith('.ts'));

        const utilityCommandList = new Array<CommandInterface>();

        utilityCommandFiles.forEach((file) => {
            const command = require(`../utility/${file}`);
            if (!file) return;
            const instance = new command.default();
            utilityCommandList.push(instance);
        });

        const utilityEmbed = new MessageEmbed()
            .setTitle('Comandos - Utilidades')
            .setThumbnail(icons.questionIcon);

        utilityCommandList.forEach((command) => {
            utilityEmbed.addField(
                command.title.toLowerCase(),
                command.description
            );
        });

        return utilityEmbed;
    }

    showsQuestionEmbed() {
        return new MessageEmbed()
            .setTitle('Kyouka - Sobre')
            .setDescription(
                'Olá! O que deseja?! Digo, prazer! Estou tão acostumada a servir servidores que erro no vocabulário, as vezes :sweat_smile:! Enfim, me chamo Kyouka, como sabes, e meu foco aqui é servir a todos e ter todo tipo de comando possível, afinal, um bom bar é aquele que serve de tudo... Digo, servidor*... Abaixo deixo descritas algumas informações sobre mim.'
            )
            .setColor(kyoukaColors.deepPurple)
            .addField('Linguagem:', 'TypeScript', true)
            .addField('Lib (biblioteca):', 'Discord.js', true)
            .addField('Ano que fui criada:', 2020, true)
            .addField('Meu objetivo:', 'Ser um BOT completo!', true)
            .addField('Estou indo bem?', 'Me diga você!', true)
            .setImage('https://i.imgur.com/5NpsUiG.gif');
    }
}
