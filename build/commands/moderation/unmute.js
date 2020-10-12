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
exports.Unmute = void 0;
var errorMessage_1 = require("../../utils/errorMessage");
var errorReplies_1 = require("../../utils/errorReplies");
var Unmute = (function () {
    function Unmute() {
        this.title = 'Unmute';
        this.description = 'Retirar o mute de algum usuário';
        this.aliases = ['unmute', 'desmutar'];
        this.args = '@user';
    }
    Unmute.prototype.run = function (client, message, args) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function () {
            var userHasPermission, user, muteRole, isUserMuted;
            return __generator(this, function (_g) {
                userHasPermission = (_a = message.member) === null || _a === void 0 ? void 0 : _a.hasPermission(['MUTE_MEMBERS', 'MANAGE_ROLES'], { checkAdmin: true, checkOwner: true });
                if (!userHasPermission)
                    return [2, errorMessage_1.sendErrorMessage(errorReplies_1.errorReplies.permission, message)];
                try {
                    user = message.mentions.users.first();
                    if (!user)
                        return [2, errorMessage_1.sendErrorMessage(errorReplies_1.errorReplies.mentionUser, message)];
                    muteRole = (_b = message.guild) === null || _b === void 0 ? void 0 : _b.roles.cache.find(function (role) { return role.name === 'Kyouka Mute'; });
                    if (!muteRole)
                        return [2];
                    isUserMuted = (_d = (_c = message.guild) === null || _c === void 0 ? void 0 : _c.member(user)) === null || _d === void 0 ? void 0 : _d.roles.cache.find(function (role) { return role.name === 'Kyouka Mute'; });
                    if (!isUserMuted)
                        return [2, errorMessage_1.sendErrorMessage(errorReplies_1.errorReplies.userNotMuted, message)];
                    (_f = (_e = message.guild) === null || _e === void 0 ? void 0 : _e.member(user)) === null || _f === void 0 ? void 0 : _f.roles.remove(muteRole);
                    return [2, errorMessage_1.sendSucessMessage('Usuário desmutado', message)];
                }
                catch (err) {
                    return [2, errorMessage_1.sendErrorMessage(errorReplies_1.errorReplies.executingCommand, message)];
                }
                return [2];
            });
        });
    };
    return Unmute;
}());
exports.Unmute = Unmute;
//# sourceMappingURL=unmute.js.map