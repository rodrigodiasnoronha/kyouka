"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mute = void 0;
var mongoose_1 = require("mongoose");
var muteSchema = new mongoose_1.Schema({
    guild_id: { type: String, required: true },
    user_id: { type: String, required: true },
    reason: { type: String, required: false },
    mute_time: { type: String, required: true },
    muted_by_id: { type: String, required: true },
}, {
    timestamps: true,
});
exports.Mute = mongoose_1.model('Mute', muteSchema);
//# sourceMappingURL=Mute.js.map