import { MagicItemEnum } from "../../domain/enums/magic-item-type.enum"

export class CreateMagicItemDto {
    name: string
    itemType: MagicItemEnum
    strength: number
    defense: number
}