import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { GuildWelcomeEntity } from './GuildWelcomeEntity';

const botPrefix = process.env.BOT_PREFIX as string;

@Entity({ schema: 'guild_schema', name: 'guild_table' })
export class GuildEntity {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;


    // guild info
    @Column({ nullable: false, unique: true, comment: "Guild's ID" })
    guild_id: string;

    @Column({ length: 100, nullable: false, comment: "Guild's name" })
    guild_name: string;

    @Column({ length: 1, default: botPrefix, comment: "Guild's prefix" })
    guild_prefix: string;

    @Column({ default: 0, type: 'bigint', comment: "Guild's member count" })
    guild_member_count: number;

    @Column({ default: 'pt-br', nullable: false, comment: "Guild's language" })
    guild_language: string

    
    // relationship
    @OneToOne(() => GuildWelcomeEntity, guildWelcomeEntity => guildWelcomeEntity.guild)
    @JoinColumn({ name: 'guild_welcome_id'})
    guild_welcome: GuildWelcomeEntity


    // update/create/deleted at
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}
