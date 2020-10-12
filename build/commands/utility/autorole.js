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
var errorReplies_1 = require("../../utils/errorReplies");
var Guild_1 = require("../../database/entities/Guild");
var createGuild_1 = require("../../functions/createGuild");
var Autorole = (function () {
    function Autorole() {
        this.title = 'Autorole';
        this.description = 'Adiciona um cargo específico quando o usuário entrar no servidor.';
        this.aliases = ['autorole'];
        this.args = '@cargo';
    }
    Autorole.prototype.run = function (client, message, args) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var userHasPermission, guild, role_1, role, err_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 7, , 8]);
                        if (message.channel.type === 'dm')
                            return [2];
                        userHasPermission = (_a = message.member) === null || _a === void 0 ? void 0 : _a.hasPermission(['ADMINISTRATOR'], {
                            checkAdmin: true,
                            checkOwner: true,
                        });
                        if (!userHasPermission)
                            return [2, errorMessage_1.sendErrorMessage(errorReplies_1.errorReplies.permission, message)];
                        return [4, Guild_1.Guild.findOne({ guild_id: (_b = message.guild) === null || _b === void 0 ? void 0 : _b.id })];
                    case 1:
                        guild = _d.sent();
                        if (!!guild) return [3, 3];
                        return [4, createGuild_1.createGuild(message.guild)];
                    case 2:
                        guild = _d.sent();
                        if (!guild)
                            return [2];
                        _d.label = 3;
                    case 3:
                        if (!(args[0] === 'on' || args[0] === 'off')) return [3, 5];
                        return [4, this.changeAutoroleStatus(args[0] === 'on', guild)];
                    case 4:
                        _d.sent();
                        return [2, errorMessage_1.sendSucessMessage("O autorole foi " + (args[0] === 'on' ? 'ativado' : 'desativado') + " neste servidor.", message)];
                    case 5:
                        if (args[0] === 'view') {
                            if (guild.autorole_status !== 'on') {
                                return [2, errorMessage_1.sendSucessMessage('O Autorole neste servidor está desativado.', message)];
                            }
                            if (guild.autorole_id) {
                                role_1 = (_c = message.guild) === null || _c === void 0 ? void 0 : _c.roles.cache.get(guild.autorole_id);
                                return [2, errorMessage_1.sendSucessMessage("O cargo de autorole definido previamente: `" + (role_1 === null || role_1 === void 0 ? void 0 : role_1.name) + "`", message)];
                            }
                            else {
                                return [2, errorMessage_1.sendSucessMessage("N\u00E3o h\u00E1 nenhum cargo de autorole definido neste servidor.", message)];
                            }
                        }
                        role = message.mentions.roles.first();
                        if (!role)
                            return [2, this.helper(message)];
                        guild.autorole_status = 'on';
                        guild.autorole_id = role.id;
                        return [4, guild.save()];
                    case 6:
                        _d.sent();
                        return [2, errorMessage_1.sendSucessMessage('Cargo de autorole definido com sucesso.', message)];
                    case 7:
                        err_1 = _d.sent();
                        return [2, this.helper(message)];
                    case 8: return [2];
                }
            });
        });
    };
    Autorole.prototype.helper = function (message) {
        var messageEmbed = new discord_js_1.MessageEmbed().setTitle(':book: Autorole - Info').setDescription("\n                Selecione um cargo para setar ao novos usu\u00E1rios quando eles entrarem no servidor.\n               \n                **autorole @cargo** \n                Adiciona o cargo de autorole.\n                \n                **autorole view**\n                Visualize o cargo de autorole definido no servidor.\n                \n                **autorole on**\n                Ativa o autorole dentro do seu servidor.\n                \n                **autorole off**\n                Desativa a fun\u00E7\u00E3o de autorole no servidor\n            ");
        return message.channel.send(messageEmbed);
    };
    Autorole.prototype.changeAutoroleStatus = function (status, guild) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        guild.autorole_status = status ? 'on' : 'off';
                        return [4, guild.save()];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    return Autorole;
}());
exports.default = Autorole;
//# sourceMappingURL=autorole.js.map