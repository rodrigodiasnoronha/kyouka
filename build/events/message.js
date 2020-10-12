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
exports.message = void 0;
var prefix = process.env.BOT_PREFIX || '.';
var ban_1 = __importDefault(require("../commands/moderation/ban"));
var clear_1 = __importDefault(require("../commands/moderation/clear"));
var kick_1 = __importDefault(require("../commands/moderation/kick"));
var mute_1 = __importDefault(require("../commands/moderation/mute"));
var nickname_1 = __importDefault(require("../commands/moderation/nickname"));
var unmute_1 = require("../commands/moderation/unmute");
var embed_1 = __importDefault(require("../commands/utility/embed"));
var autorole_1 = __importDefault(require("../commands/utility/autorole"));
var prefix_1 = require("../commands/moderation/prefix");
var say_1 = __importDefault(require("../commands/utility/say"));
var _8ball_1 = __importDefault(require("../commands/utility/8ball"));
var ban = new ban_1.default();
var mute = new mute_1.default();
var unmute = new unmute_1.Unmute();
var kick = new kick_1.default();
var nickname = new nickname_1.default();
var clear = new clear_1.default();
var embed = new embed_1.default();
var autorole = new autorole_1.default();
var prefixCommand = new prefix_1.Prefix();
var sayCommand = new say_1.default();
var eightBallCommand = new _8ball_1.default();
var defaultPrefix = process.env.BOT_PREFIX;
exports.message = function (message, prefixCollection) { return __awaiter(void 0, void 0, void 0, function () {
    var prefix, args, command;
    var _a;
    return __generator(this, function (_b) {
        if (message.author.bot || message.webhookID)
            return [2];
        prefix = message.guild
            ? prefixCollection.get(message.guild.id)
            : defaultPrefix;
        if (!prefix) {
            prefix = defaultPrefix;
        }
        if (!message.content.toLowerCase().startsWith(prefix))
            return [2];
        args = message.content.slice(prefix.length).trim().split(/ +/);
        command = ((_a = args.shift()) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || '';
        if (!command || command.startsWith('.'))
            return [2];
        if (ban.aliases.includes(command))
            return [2, ban.run(message.client, message, args)];
        if (mute.aliases.includes(command))
            return [2, mute.run(message.client, message, args)];
        if (unmute.aliases.includes(command))
            return [2, unmute.run(message.client, message, args)];
        if (kick.aliases.includes(command))
            return [2, kick.run(message.client, message, args)];
        if (nickname.aliases.includes(command))
            return [2, nickname.run(message.client, message, args)];
        if (clear.aliases.includes(command))
            return [2, clear.run(message.client, message, args)];
        if (embed.aliases.includes(command))
            return [2, embed.run(message.client, message, args)];
        if (autorole.aliases.includes(command))
            return [2, autorole.run(message.client, message, args)];
        if (prefixCommand.aliases.includes(command))
            return [2, prefixCommand.run(message.client, message, args, prefixCollection)];
        if (sayCommand.aliases.includes(command))
            return [2, sayCommand.run(message.client, message, args)];
        if (eightBallCommand.aliases.includes(command))
            return [2, eightBallCommand.run(message.client, message, args)];
        return [2];
    });
}); };
//# sourceMappingURL=message.js.map