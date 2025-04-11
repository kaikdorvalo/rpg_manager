import { ClassEnum } from "../../domain/enums/class.enum"

export class CreateCharacterDto {
    name: string
    adventurousName: string
    class: ClassEnum
    level: number
    magicItens: string
    strength: number
    defense: number
}