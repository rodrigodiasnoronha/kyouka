/**
 *
 *  Kyouka Discord BOT
 *
 *  Entidade do DB que armazena informações sobre o BOT
 *
 * */

import { Entity } from 'typeorm';

@Entity()
export class GuildEntity {
    id: number;

    // guild info
    guild_name: string;
    guild_id: string;
    guild_prefix: string;
    guild_member_count: number;

    // autorole
    autorole_id: string;
    autorole_status: string;

    // log
    log_channel: string;
    log_status: string;

    welcome_status: string
    welcome_channel: string
    welcome_title: string;
    welcome_subtitle: string;
    welcome_footer: string
    welcome_image: string
    welcome_thumbnail: string

    // leave properties
    leave_status: string
    leave_title: string
    leave_subtitle: string
    leave_footer: string
    leave_channel: string
    leave_image: string
    leave_thumbnail: { type: String, default: 'https://i.imgur.com/3bzRV1z.png' },
}

// const GuildSchema = new Schema(
//     {
//         // Guild info
//         guild_name: { type: String, required: true },
//         guild_id: { type: String, required: true, unique: true },
//
//         // Guild config
//         autorole_id: { type: String },
//         autorole_status: { type: String, default: 'off' },
//         prefix: { type: String },
//         memberCount: { type: Number, default: 0 },
//
//         // log properties
//         log_channel: { type: String },
//         log_status: { type: String, default: 'off' },
//
//         // welcome properties
//         welcome_status: { type: String, default: 'off' },
//         welcome_channel: { type: String },
//         welcome_title: { type: String, default: 'Bem vindo, $name!' },
//         welcome_subtitle: { type: String, default: 'Agora temos $member_count neste servidor!' },
//         welcome_footer: { type: String, default: 'ID do usuário: $user_id' },
//         welcome_image: { type: String, default: '' },
//         welcome_thumbnail: { type: String, default: 'https://i.imgur.com/3bzRV1z.png' },
//
//         // leave properties
//         leave_status: { type: String, default: 'off' },
//         leave_title: { type: String, default: 'Adeus, $name!' },
//         leave_subtitle: { type: String, default: 'Até a próxima, $user! Agora temos $member_count membros!' },
//         leave_footer: { type: String, default: 'ID do usuário: $user_id' },
//         leave_channel: { type: String },
//         leave_image: { type: String, default: '' },
//         leave_thumbnail: { type: String, default: 'https://i.imgur.com/3bzRV1z.png' },
//     },
//     { timestamps: true }
// );
//
// export const Guild = model<GuildModelInterface>('Guild', GuildSchema);
