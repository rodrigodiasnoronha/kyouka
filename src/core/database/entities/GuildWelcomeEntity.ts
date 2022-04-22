import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { StatusRole } from "../../types";
import { GuildEntity } from "./GuildEntity";

@Entity({ schema: 'guild_schema', name: 'guild_welcome_table' })
export class GuildWelcomeEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    // guild welcome info
    @Column({ type: 'enum', enum: StatusRole, default: StatusRole.OFF, comment: "Welcome message status (If we have to show this message)"})
    welcome_status: StatusRole;

    @Column({ nullable: true, comment: "Welcome channel id" })
    welcome_channel_id?: string;

    @Column({ nullable: true, comment: "Welcome's title message" })
    welcome_title?: string;

    @Column({ nullable: true, comment: "Welcome's subtitle message" })
    welcome_subtitle?: string;

    @Column({ nullable: true, comment: "Welcome's footer message"})
    welcome_footer?: string;

    @Column({ nullable: true, comment: "Welcome image's path" })
    welcome_image?: string;

    @Column({ nullable: true, comment: "Welcome thumbnail's path" })
    welcome_thumbnail: string;

    
    // relationship
    @OneToOne(() => GuildEntity, guildEntity => guildEntity.guild_welcome) // specify inverse side as a second parameter
    guild: GuildEntity


    // update/create/deleted at
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}
