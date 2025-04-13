import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import "dotenv/config";
import { ClassEnum } from "../enums/class.enum";
import { MagicItem } from "src/modules/magic_item/domain/entities/magic-item.entity";

@Entity({ schema: process.env.DATABASE_SCHEMA })
export class Character {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ nullable: false })
    name: string

    @Column({ nullable: false })
    adventurousName: string

    @Column({ type: 'enum', enum: ClassEnum, nullable: false })
    class: ClassEnum

    @Column({ nullable: false })
    level: number

    @ManyToMany(() => MagicItem, magicItem => magicItem.characters, {
        lazy: true
    })
    @JoinTable()
    magicItens: MagicItem[]

    @Column({ nullable: false })
    strength: number

    @Column({ nullable: false })
    defense: number
}