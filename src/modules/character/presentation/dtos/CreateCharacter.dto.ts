import { MagicItem } from "src/modules/magic_item/domain/entities/magic-item.entity"
import { ClassEnum } from "../../domain/enums/class.enum"
import { CreateCharacterMagicItemDto } from "./create-character-magic-item.dto"

export class CreateCharacterDto {
    name: string
    adventurousName: string
    class: ClassEnum
    level: number
    magicItens?: CreateCharacterMagicItemDto[]
    strength: number
    defense: number
}