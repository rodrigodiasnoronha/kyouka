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
    autorole_id: {type: String },
    prefix: {type: String },
    memberCount: { type: Number, default: 0},
    welcome_status: {type: String, default: 'off'},
    welcome_channel: {type: String },
    welcome_title: { type: String },
    welcome_subtitle: { type: String },
    welcome_footer: { type: String },
    welcome_image: { type: String },
    welcome_thumbnail: { type: String }
}, {timestamps: true})


export const Guild = model<GuildModelInterface>('Guild', GuildSchema);

