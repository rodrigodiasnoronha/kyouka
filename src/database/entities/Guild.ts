/**
 *
 *  Kyouka Discord BOT
 *
 *  Entidade do DB que armazena informações sobre o BOT
 *
 * */

import { Schema, model } from 'mongoose';
import { GuildModelInterface } from '../../types';

const GuildSchema = new Schema(
    {
        // Guild info
        guild_name: { type: String, required: true },
        guild_id: { type: String, required: true, unique: true },

        // Guild config
        autorole_id: { type: String },
        autorole_status: { type: String, default: 'off' },
        prefix: { type: String },
        memberCount: { type: Number, default: 0 },

        // log properties
        log_channel: { type: String },
        log_status: { type: String, default: 'off' },

        // welcome properties
        welcome_status: { type: String, default: 'off' },
        welcome_channel: { type: String },
        welcome_title: { type: String },
        welcome_subtitle: { type: String },
        welcome_footer: { type: String },
        welcome_image: { type: String },
        welcome_thumbnail: { type: String },

        // leave properties
        leave_status: { type: String, default: 'off' },
        leave_title: { type: String },
        leave_subtitle: { type: String },
        leave_footer: { type: String },
        leave_channel: { type: String },
        leave_image: { type: String },
        leave_thumbnail: { type: String },
    },
    { timestamps: true }
);

export const Guild = model<GuildModelInterface>('Guild', GuildSchema);
