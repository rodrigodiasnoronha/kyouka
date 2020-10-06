/**
 *
 *  Kyouka Discord BOT
 *
 *  Entidade do DB que armazena informações sobre o BOT
 *
 * */

import {Schema, model} from 'mongoose'
import {GuildModelInterface} from "../../types";

const GuildSchema = new Schema({
    guild_name: {type: String, required: true},
    guild_id: {type: String, required: true, unique: true},
    autorole_status: {type: String, default: 'off'},
    autorole_id: {type: String, required: false},
    prefix: {type: String, required: false},
    memberCount: { type: Number, default: 0}
}, {timestamps: true})


export const Guild = model<GuildModelInterface>('Guild', GuildSchema);

