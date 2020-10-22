import {CommandInterface} from "../../types";
import {Client, Message, MessageAttachment} from "discord.js";
import {createCanvas, loadImage,} from 'canvas'
import {create} from "domain";
import {images} from "../../utils/images";

export default class Lgbt implements CommandInterface {
    public title = 'LGBT';
    public description = 'Faça um filtro LGBT na sua foto ou de algum outro usuário';
    public args = '@user';
    public aliases = ['lgbt'];

    public async run(client: Client, message: Message, args: string[]) {
        const user = message.mentions.users.first();

        let profilePicURL = user ?  user.avatarURL({
            format: 'png',
            size: 1024
        }) : message.author.avatarURL({
            format: 'png',
            size: 1024
        });

        // criar canvas e seu contexto
        const canvas = createCanvas(1024, 1024,);
        const context = canvas.getContext('2d');

        // carregar imagem de perfil para o canvas
        const canvasProfileImage = await loadImage(profilePicURL || images.discordDefaultProfileImage);

        // setar imagem de perfil no canvas
        context.drawImage(canvasProfileImage, 0, 0, canvas.width, canvas.height);

        // adiciona cores
        context.fillStyle = 'rgba(244,67,54, 0.4)'; // vermelho
        context.fillRect(0, 0, 170.6, canvas.height);

        context.fillStyle = 'rgba(255,152,0,0.4)'; // laranja
        context.fillRect(170.6, 0, 170.6, canvas.height);

        context.fillStyle = 'rgba(255,235,59, 0.4)'; // amarelo
        context.fillRect(341.2 , 0, 170.6, canvas.height);

        context.fillStyle = 'rgba(76,175,80,0.4)'; // verde
        context.fillRect(511.8, 0, 170.6, canvas.height);

        context.fillStyle = 'rgba(33,150,243,0.4)' // azul
        context.fillRect(682.4, 0, 170.6, canvas.height);

        context.fillStyle = 'rgba(103,58,183, 0.4)'; // roxo
        context.fillRect(853, 0, 170.6, canvas.height);

        // envia o arquivo
        const attachment = new MessageAttachment(canvas.toBuffer(), 'lgbt.png');
        await message.channel.send(attachment);
        await message.delete();
    }
}