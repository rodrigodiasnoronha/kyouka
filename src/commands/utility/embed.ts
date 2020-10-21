import { Client, Message, MessageEmbed } from 'discord.js';
import { CommandInterface } from '../../types';
import { sendErrorMessage } from '../../utils/sendMessage';
import { icons } from '../../utils/icons';

interface JsonEmbed {
    title?: string;
    description?: string;
    footer?: string;
    color?: string;
    image_url?: string;
    thumbnail_url?: string;
    author?: string;
    url?: string;
    fields?: [
        {
            value: string;
            name: string;
        }
    ];
}

export default class Embed implements CommandInterface {
    public title = 'Embed';
    public description = 'Crie um embed';
    public aliases = ['embed'];
    public args = '';

    async run(client: Client, message: Message, args: string[]) {
        const jsonInString = args.join(' ');

        if (args[0] === 'help' || args[0] === 'ajuda')
            return this.helper(message);

        try {
            if (!jsonInString) return;

            const embedObject = JSON.parse(jsonInString) as JsonEmbed;

            const messageEmbed = new MessageEmbed();

            if (embedObject.title) messageEmbed.setTitle(embedObject.title);
            if (embedObject.fields) messageEmbed.addFields(embedObject.fields);
            if (embedObject.color) messageEmbed.setColor(embedObject.color);
            if (embedObject.footer) messageEmbed.setFooter(embedObject.footer);
            if (embedObject.author) messageEmbed.setAuthor(embedObject.author);
            if (embedObject.url) messageEmbed.setURL(embedObject.url);

            if (embedObject.description)
                messageEmbed.setDescription(embedObject.description);

            if (embedObject.image_url)
                messageEmbed.setImage(embedObject.image_url);

            if (embedObject.thumbnail_url)
                messageEmbed.setThumbnail(embedObject.thumbnail_url);

            return message.channel.send(messageEmbed);
        } catch (err) {
            return sendErrorMessage(
                {
                    errorMessage:
                        'Ocorreu um erro ao interpretar o JSON. Verifique se há algum erro de síntaxe e tente novamente. Você também pode digitar `.embed help` para saber mais.',
                },
                message
            );
        }
    }

    helper(message: Message) {
        const description = `
            > Olá, ${message.author.username}!
            > O comando embed funciona para você utilizar a estrutura de um embed em uma mensagem customizada por você mesmo! Para utilizar esse comando, você precisa passar um JSON como argumento do comando. Segue o exemplo:

            {
                "title":"Eu sou o título.",
                "description": "Eu sou a descrição.",
                "color": "#ffcdd2",
                "image_url": "https://i.imgur.com/6xq4R92.jpeg",
                "author": "${message.author.username} - nome do autor.",
                "thumbnail_url": "https://i.imgur.com/Cu0kddU.jpeg",
                "footer": "Eu sou o rodapé"
            }

            > Tente copiar o JSON acima e passa-lo como parâmetro do embed.
            > Você também pode usar essas propriedades adicionais: 
            {
                "url": "url para quando o usuário clicar no embed, ele ser redirecionado.",
                "fields": [ {  "name": "titulo do campo", "value": "conteúdo do campo" } ]
            }
        `;

        const messageEmbed = new MessageEmbed()
            .setTitle('Embed - Ajuda')
            .setDescription(description)
            .setThumbnail(icons.questionIcon);
        return message.channel.send(messageEmbed);
    }
}
