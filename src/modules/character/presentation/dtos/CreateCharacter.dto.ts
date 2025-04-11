import { MagicItem } from "src/modules/magic_item/domain/entities/magic-item.entity"
import { ClassEnum } from "../../domain/enums/class.enum"

export class CreateCharacterDto {
    name: string
    adventurousName: string
    class: ClassEnum
    level: number
    magicItens: MagicItem[]
    strength: number
    defense: number
}