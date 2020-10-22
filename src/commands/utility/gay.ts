import {CommandInterface} from "../../types";
import {Client, Message, MessageAttachment} from "discord.js";
import {createCanvas, loadImage} from 'canvas'
import {images} from "../../utils/images";
import {kyoukaColors} from "../../utils/colors";

export default class Gay implements CommandInterface {
    public title = 'Gay';
    public description = 'Veja em quantos % você é gay';
    public aliases = ['gay', 'howmanygay'];
    public args = '';

    public async run(client: Client, message: Message, args: string[]) {
        const user = message.mentions.users.first();

        const userProfilePicURL = user ? user.avatarURL({
            size: 1024,
            format: 'png'
        }) : message.author.avatarURL({size: 1024, format: 'png'});

        const percentage = Math.round(Math.random() * 100);
        const result = `Você é ${percentage}% gay`;

        // cria o canvas e seu contexto
        const canvas = createCanvas(1024, 1024);
        const context = canvas.getContext('2d');

        // adiciona a imagem de perfil ao contexto do canvas
        const canvasProfileImage = await loadImage(userProfilePicURL || images.discordDefaultProfileImage);
        context.drawImage(canvasProfileImage, 0, 0, canvas.width, canvas.height);


        // adiciona cores LGBT no canvas
        context.fillStyle = 'rgba(244,67,54, 0.4)'; // vermelho
        context.fillRect(0, 0, 170.6, canvas.height);

        context.fillStyle = 'rgba(255,152,0,0.4)'; // laranja
        context.fillRect(170.6, 0, 170.6, canvas.height);

        context.fillStyle = 'rgba(255,235,59, 0.4)'; // amarelo
        context.fillRect(341.2, 0, 170.6, canvas.height);

        context.fillStyle = 'rgba(76,175,80,0.4)'; // verde
        context.fillRect(511.8, 0, 170.6, canvas.height);

        context.fillStyle = 'rgba(33,150,243,0.4)' // azul
        context.fillRect(682.4, 0, 170.6, canvas.height);

        context.fillStyle = 'rgba(103,58,183, 0.4)'; // roxo
        context.fillRect(853, 0, 170.6, canvas.height);

        // filtro um pouco escuro;
        context.fillStyle = 'rgba(10, 10, 10, 0.5)';
        context.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 6);

        // escreve no canvas
        context.font = 'bold 75px Arial';
        context.fillStyle = '#ffffff';
        context.fillText(result, canvas.width / 5, canvas.height / 1.65);

        const attachment = new MessageAttachment(canvas.toBuffer(), 'gay.png');
        await message.channel.send(attachment);
        await message.delete();
    }
}