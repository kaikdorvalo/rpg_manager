import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import "dotenv/config";
import { MagicItemEnum } from "../enums/magic-item-type.enum";
import { Character } from "src/modules/character/domain/entities/character.entity";

@Entity({ schema: process.env.DATABASE_SCHEMA })
export class MagicItem {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ nullable: false })
    name: string

    @Column({ nullable: false, enum: MagicItemEnum, type: 'enum' })
    itemType: MagicItemEnum

    @Column({ nullable: false })
    strength: number

    @Column({ nullable: false })
    defense: number

    @ManyToOne(() => Character, character => character.magicItens, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        cascade: true
    })
    character: Character
}