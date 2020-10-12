"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guild = void 0;
var mongoose_1 = require("mongoose");
var GuildSchema = new mongoose_1.Schema({
    guild_name: { type: String, required: true },
    guild_id: { type: String, required: true, unique: true },
    autorole_status: { type: String, default: 'off' },
    autorole_id: { type: String, required: false },
    prefix: { type: String, required: false },
    memberCount: { type: Number, default: 0 }
}, { timestamps: true });
exports.Guild = mongoose_1.model('Guild', GuildSchema);
//# sourceMappingURL=Guild.js.map