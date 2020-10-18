import {Client, Message, MessageAttachment} from "discord.js";
import { CommandInterface } from "../../types";
// @ts-ignore
import canvacord from 'canvacord';
import {images} from "../../utils/images";


export default class Level implements CommandInterface {
    public title = 'Level';
    public description = 'Veja seu nível';
    public aliases = ['level', 'xp'];
    public args = '';
    public async run(client: Client, message: Message, args:string[]) {
        return message.channel.send("Este comando não existe.");
        // const userAvatar = message.author.avatarURL({
        //     format: "png"
        // }) || images.discordDefaultProfileImage;
        // const currentXp = 100;
        // const requiredXp = 500;
        // const userStatus = message.author.presence.status;
        // const username = message.author.username;
        // const userTag = message.author.discriminator;
        //
        // const rank = new canvacord.Rank()
        //     .setAvatar(userAvatar)
        //     .setCurrentXP(currentXp)
        //     .setRequiredXP(requiredXp)
        //     .setStatus(userStatus)
        //     .setProgressBar("#FFFFFF", "COLOR")
        //     .setUsername(username)
        //     .setDiscriminator(userTag);
        //
        // const imageRank =  await rank.build();
        //
        // return message.channel.send(new MessageAttachment(imageRank, 'rank.png'));
    }
}