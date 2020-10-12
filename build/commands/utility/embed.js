"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var errorMessage_1 = require("../../utils/errorMessage");
var icons_1 = require("../../utils/icons");
var Embed = (function () {
    function Embed() {
        this.title = 'Embed';
        this.description = 'Easdas';
        this.aliases = ['embed'];
        this.args = '';
    }
    Embed.prototype.run = function (client, message, args) {
        return __awaiter(this, void 0, void 0, function () {
            var jsonInString, embedObject, messageEmbed;
            return __generator(this, function (_a) {
                jsonInString = args.join(' ');
                if (args[0] === 'help' || args[0] === 'ajuda')
                    return [2, this.helper(message)];
                try {
                    if (!jsonInString)
                        return [2];
                    embedObject = JSON.parse(jsonInString);
                    messageEmbed = new discord_js_1.MessageEmbed();
                    if (embedObject.title)
                        messageEmbed.setTitle(embedObject.title);
                    if (embedObject.fields)
                        messageEmbed.addFields(embedObject.fields);
                    if (embedObject.color)
                        messageEmbed.setColor(embedObject.color);
                    if (embedObject.footer)
                        messageEmbed.setFooter(embedObject.footer);
                    if (embedObject.author)
                        messageEmbed.setAuthor(embedObject.author);
                    if (embedObject.url)
                        messageEmbed.setURL(embedObject.url);
                    if (embedObject.description)
                        messageEmbed.setDescription(embedObject.description);
                    if (embedObject.image_url)
                        messageEmbed.setImage(embedObject.image_url);
                    if (embedObject.thumbnail_url)
                        messageEmbed.setThumbnail(embedObject.thumbnail_url);
                    return [2, message.channel.send(messageEmbed)];
                }
                catch (err) {
                    return [2, errorMessage_1.sendErrorMessage({
                            errorMessage: 'Ocorreu um erro ao interpretar o JSON. Verifique se há algum erro de síntaxe e tente novamente. Você também pode digitar `.embed help` para saber mais.',
                        }, message)];
                }
                return [2];
            });
        });
    };
    Embed.prototype.helper = function (message) {
        var description = "\n            > Ol\u00E1, " + message.author.username + "!\n            > O comando embed funciona para voc\u00EA utilizar a estrutura de um embed em uma mensagem customizada por voc\u00EA mesmo! Para utilizar esse comando, voc\u00EA precisa passar um JSON como argumento do comando. Segue o exemplo:\n\n            {\n                \"title\":\"Eu sou o t\u00EDtulo.\",\n                \"description\": \"Eu sou a descri\u00E7\u00E3o.\",\n                \"color\": \"#ffcdd2\",\n                \"image_url\": \"https://i.imgur.com/6xq4R92.jpeg\",\n                \"author\": \"" + message.author.username + " - nome do autor.\",\n                \"thumbnail_url\": \"https://i.imgur.com/Cu0kddU.jpeg\",\n                \"footer\": \"Eu sou o rodap\u00E9\"\n            }\n\n            > Tente copiar o JSON acima e passa-lo como par\u00E2metro do embed.\n            > Voc\u00EA tamb\u00E9m pode usar essas propriedades adicionais: \n            {\n                \"url\": \"url para quando o usu\u00E1rio clicar no embed, ele ser redirecionado.\",\n                \"fields\": [ {  \"name\": \"titulo do campo\", \"value\": \"conte\u00FAdo do campo\" } ]\n            }\n        ";
        var messageEmbed = new discord_js_1.MessageEmbed()
            .setTitle('Embed - Ajuda')
            .setDescription(description)
            .setThumbnail(icons_1.icons.questionIcon);
        return message.channel.send(messageEmbed);
    };
    return Embed;
}());
exports.default = Embed;
//# sourceMappingURL=embed.js.map