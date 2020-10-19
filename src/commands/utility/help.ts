import { CommandInterface } from '../../types';
import {
    Client,
    Message,
    MessageEmbed,
    MessageReaction,
    User,
} from 'discord.js';
import { icons } from '../../utils/icons';

export default class HelpCommand implements CommandInterface {
    public title = 'Help';
    public description = '';
    public aliases = ['ajuda', 'help'];
    public args = '';
    private moderationCommands = [
        'ban',
        'clear',
        'kick',
        'mute',
        'nickname',
        'prefix',
        'unmute',
        'welcome',
    ];
    private funnyCommands = ['chorar', 'pensando', 'jankenpon', 'sad'];
    private utilityCommands = [
        '8ball',
        'autorole',
        'embed',
        'help',
        'say',
        'changelog',
    ];

    public async run(client: Client, message: Message, args: string[]) {
        const embed = new MessageEmbed()
            .setTitle('Kyouka - Ajuda')
            .setDescription(
                `
            Abaixo você pode ver as categorias de comandos que eu possuo.
            
            :police_officer: **Moderação**
            
            :fire: **Diversão**
            
            :tools: **Utilidades**
        `
            )
            .setThumbnail(icons.questionIcon);

        const messageSent = await message.channel.send(embed);

        await messageSent.react('👮');
        await messageSent.react('🔥');
        await messageSent.react('🛠️');

        const validsReactEmojis = ['👮', '🔥', '🛠️'];
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
            if (reaction.emoji.name === '🔥') {
                const embed = this.showsFunnyEmbed();
                await messageSent.edit(embed);
            } else if (reaction.emoji.name === '🛠️') {
                const embed = this.showsUtilityEmbed();
                await messageSent.edit(embed);
            } else if (reaction.emoji.name === '👮') {
                const embed = this.showsModerationEmbed();
                await messageSent.edit(embed);
            }
        });

        collector.on('end', async () => {
            await messageSent.reactions.removeAll();
        });
    }

    showsModerationEmbed(): MessageEmbed {
        let listModCommands = '';
        this.moderationCommands.forEach((command) => {
            listModCommands += `\`${command}\` `;
        });

        return new MessageEmbed()
            .setTitle('Comandos - Moderação')
            .setDescription(listModCommands)
            .setThumbnail(icons.questionIcon);
    }

    showsFunnyEmbed(): MessageEmbed {
        let listFunnyCommands = '';
        this.funnyCommands.forEach((command) => {
            listFunnyCommands += `\`${command}\` `;
        });

        return new MessageEmbed()
            .setTitle('Comandos - Diversão')
            .setDescription(listFunnyCommands)
            .setThumbnail(icons.questionIcon);
    }

    showsUtilityEmbed(): MessageEmbed {
        let listUtilityCommands = '';

        this.utilityCommands.forEach((command) => {
            listUtilityCommands += `\`${command}\` `;
        });

        return new MessageEmbed()
            .setTitle('Comandos - Utilidades')
            .setDescription(listUtilityCommands)
            .setThumbnail(icons.questionIcon);
    }
}
