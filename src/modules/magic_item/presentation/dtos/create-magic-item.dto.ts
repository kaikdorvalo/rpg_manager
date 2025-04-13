import { MagicItemEnum } from "../../domain/enums/magic-item-type.enum"
import { MagicItemCharacterDto } from "./magic-item-character.dto"

export class CreateMagicItemDto {
    character: MagicItemCharacterDto
    name: string
    itemType: MagicItemEnum
    strength: number
    defense: number
}