import { MagicItemEnum } from "../enums/magic-item-type.enum"

export class MagicItemInformation {

    constructor(
        itemName: string,
        itemType: MagicItemEnum,
        strength: number,
        defense: number
    ) {
        this.itemName = itemName
        this.itemType = itemType
        this.strength = strength
        this.defense = defense
    }

    itemName: string
    itemType: MagicItemEnum
    strength: number
    defense: number
}