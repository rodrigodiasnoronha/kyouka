import { Schema, model } from 'mongoose';
import { MuteDocument } from '../../../types';

const muteSchema = new Schema(
    {
        guild_id: { type: String, required: true },
        user_id: { type: String, required: true },
        reason: { type: String, required: false },
        mute_time: { type: String, required: true },
        muted_by_id: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

export const Mute = model<MuteDocument>('Mute', muteSchema);
