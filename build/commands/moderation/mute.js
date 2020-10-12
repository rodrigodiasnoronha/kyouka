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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var errorMessage_1 = require("../../utils/errorMessage");
var errorReplies_1 = require("../../utils/errorReplies");
var ms_1 = __importDefault(require("ms"));
var Mute = (function () {
    function Mute() {
        this.title = 'Mute';
        this.description = 'Silenciar alguém por algum tempo.';
        this.aliases = ['mute', 'mutar', 'silenciar'];
        this.args = '@user tempo motivo';
    }
    Mute.prototype.run = function (client, message, args) {
        var _a, _b, _c, _d, _e, _f, _g;
        return __awaiter(this, void 0, void 0, function () {
            var userHasPermission, botHasPermission, user, muteTime, isValidTime, timeInMilliseconds, muteRole;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        userHasPermission = (_a = message.member) === null || _a === void 0 ? void 0 : _a.hasPermission([
                            'MUTE_MEMBERS',
                            'MANAGE_ROLES',
                        ]);
                        if (!userHasPermission)
                            return [2, errorMessage_1.sendErrorMessage(errorReplies_1.errorReplies.permission, message)];
                        botHasPermission = (_c = (_b = message.guild) === null || _b === void 0 ? void 0 : _b.me) === null || _c === void 0 ? void 0 : _c.hasPermission([
                            'MUTE_MEMBERS',
                            'MANAGE_ROLES',
                        ]);
                        if (!botHasPermission)
                            return [2, errorMessage_1.sendErrorMessage(errorReplies_1.errorReplies.botPermission, message)];
                        user = message.mentions.users.first();
                        if (!user)
                            return [2, errorMessage_1.sendErrorMessage(errorReplies_1.errorReplies.mentionUser, message)];
                        if (user.id === message.author.id)
                            return [2, errorMessage_1.sendErrorMessage({
                                    errorMessage: message.author.username + " BAKA! Voc\u00EA n\u00E3o pode mutar voc\u00EA mesmo!",
                                }, message)];
                        muteTime = args[1];
                        isValidTime = this.isMuteTimeValid(muteTime);
                        if (!isValidTime)
                            return [2, errorMessage_1.sendErrorMessage(errorReplies_1.errorReplies.incorrectSintax, message)];
                        timeInMilliseconds = ms_1.default(muteTime);
                        muteRole = (_d = message.guild) === null || _d === void 0 ? void 0 : _d.roles.cache.find(function (role) { return role.name === 'Kyouka Mute'; });
                        if (!!muteRole) return [3, 2];
                        return [4, this.createMuteRole(client, message.guild)];
                    case 1:
                        muteRole = _h.sent();
                        _h.label = 2;
                    case 2:
                        if (!muteRole)
                            return [2];
                        (_e = message.guild) === null || _e === void 0 ? void 0 : _e.channels.cache.forEach(function (channel, id) {
                            channel
                                .createOverwrite(muteRole, {
                                SEND_MESSAGES: false,
                                ADD_REACTIONS: false,
                            })
                                .then(function () { })
                                .catch(function () {
                                console.log('ocorreu um erro ao mutar o usuário');
                            });
                        });
                        (_g = (_f = message.guild) === null || _f === void 0 ? void 0 : _f.member(user)) === null || _g === void 0 ? void 0 : _g.roles.add(muteRole.id);
                        errorMessage_1.sendSucessMessage("O " + user.username + " foi mutado, aquele baka!", message);
                        setTimeout(function () {
                            var _a, _b;
                            (_b = (_a = message.guild) === null || _a === void 0 ? void 0 : _a.member(user)) === null || _b === void 0 ? void 0 : _b.roles.remove(muteRole.id);
                        }, timeInMilliseconds);
                        return [2];
                }
            });
        });
    };
    Mute.prototype.createMuteRole = function (client, guild) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var role;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, ((_a = client.guilds.cache.get(guild.id)) === null || _a === void 0 ? void 0 : _a.roles.create({
                            data: {
                                name: 'Kyouka Mute',
                                color: '#cccccc',
                                permissions: [],
                                mentionable: false,
                            },
                        }))];
                    case 1:
                        role = _b.sent();
                        return [2, role];
                }
            });
        });
    };
    Mute.prototype.isMuteTimeValid = function (muteTime) {
        var arrayTimePeriod = ['m', 's', 'd', 'h', 'y'];
        return !(isNaN(Number.parseInt(muteTime.substring(0, muteTime.length - 1))) &&
            arrayTimePeriod.includes(muteTime.substring(muteTime.length - 1, muteTime.length)));
    };
    return Mute;
}());
exports.default = Mute;
//# sourceMappingURL=mute.js.map