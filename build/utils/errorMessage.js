"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSucessMessage = exports.sendErrorMessage = void 0;
var discord_js_1 = require("discord.js");
exports.sendErrorMessage = function (error, message) {
    var messageEmbed = new discord_js_1.MessageEmbed()
        .setDescription("<@" + message.author + "> " + error.errorMessage)
        .setColor('#f44336');
    return message.channel.send(messageEmbed);
};
exports.sendSucessMessage = function (sucessMessage, message) {
    var messageEmbed = new discord_js_1.MessageEmbed()
        .setDescription("<@" + message.author + "> " + sucessMessage)
        .setColor('#00e676');
    return message.channel.send(messageEmbed);
};
//# sourceMappingURL=errorMessage.js.map