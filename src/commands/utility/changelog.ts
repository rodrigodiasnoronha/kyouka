import { CommandInterface } from '../../types';
import { Client, Message, MessageEmbed } from 'discord.js';
import axios from 'axios';
import { images } from '../../utils/images';
import { sendErrorMessage } from '../../utils/sendMessage';

/**
 *
 * Na requisição é retornada bem mais dados
 * No entanto, somente esses foram mapeados aqui, por conta que não usaremos outros
 *
 * Caso usar algo que não esteja aqui, favor, mapear na Interface Commit;
 *
 * */
interface Commit {
    url: string;
    sha: string;
    node_id: string;
    commit: {
        author: {
            name: string;
            email: string;
            date: Date;
        };
        commiter: {
            name: string;
            email: string;
            date: Date;
        };
        message: string;
        comment_count: number;
    };
}

export default class Changelog implements CommandInterface {
    public title = 'Changelog';
    public description =
        'Veja as últimas modificações em meus códigos feitas por meus desenvolvedores';
    public aliases = ['changelog'];
    public args = '';
    private repositoryCommitsURL =
        'https://api.github.com/repos/rodrigodiasnoronha/kyouka/commits';

    public async run(client: Client, message: Message, args: string[]) {
        try {
            const response = await axios.get(this.repositoryCommitsURL);
            const commits = response.data as Commit[];

            const changelogEmbed = new MessageEmbed();
            changelogEmbed.title = 'Changelog - Kyouka';
            changelogEmbed.url = 'https://github.com/rodrigodiasnoronha/kyouka';
            changelogEmbed.description = '';
            changelogEmbed.setThumbnail(images.kyoukaThumbnail);

            let counter = 0;
            commits.forEach((commit) => {
                if (counter > 10) return;
                changelogEmbed.description += `**${commit.commit.message}**\nAuthored by **${commit.commit.author.name}**\n\n`;
                counter++;
            });

            return message.channel.send(changelogEmbed);
        } catch (err) {
            return sendErrorMessage(
                {
                    errorMessage:
                        'Ocorreu um erro ao mostrar meus `changelogs`.',
                },
                message
            );
        }
    }
}
