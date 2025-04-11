import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import "dotenv/config";
import { ClassEnum } from "../enums/class.enum";

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

    @Column()
    magicItens: string

    @Column({ nullable: false })
    strength: number

    @Column({ nullable: false })
    defense: number
}