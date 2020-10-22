import {CommandInterface} from "../../types";
import {Client, Message, MessageAttachment} from "discord.js";
import {createCanvas, loadImage} from 'canvas'
import {resolve } from 'path'
import {images} from "../../utils/images";

export default class Communism implements CommandInterface {
    public title = 'Communism';
    public description = 'Filtro de comunista';
    public args = '@user';
    public  aliases = ['communism', 'comunismo'];
    public async run(client: Client, message: Message, args: string[]) {
        const user = message.mentions.users.first();

        const userProfileImageURL = user ? user.avatarURL({
            format: 'png',
            size: 1024
        }) : message.author.avatarURL({  size: 1024, format: 'png' });


        const canvas = createCanvas(1024, 1024);
        const context = canvas.getContext('2d');

        const canvasProfileImage = await loadImage(userProfileImageURL || images.discordDefaultProfileImage);
        context.drawImage(canvasProfileImage, 0, 0, canvas.width, canvas.height);

        context.fillStyle = 'rgba(214, 55, 55, 0.5)';
        context.fillRect(0, 0, canvas.width, canvas.height);

        // carregar icone comunismo
        const communismIconPath = resolve(__dirname, '..', '..', 'images', 'communism.png');
        const communisnIconCanvas = await loadImage(communismIconPath);

        // setar no canvas o icone
        const dy = canvas.height / 1.6;
        const dx = canvas.width / 1.6;
        context.drawImage(communisnIconCanvas, dx, dy, 350, 350);


        const attachment = new MessageAttachment(canvas.toBuffer(), 'communism.png');
        await message.channel.send(attachment);
        await message.delete();
    }
}