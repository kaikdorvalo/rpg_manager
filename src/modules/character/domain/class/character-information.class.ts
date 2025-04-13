import { MagicItemInformation } from "src/modules/magic_item/domain/class/MagicItemInformation.class"
import { ClassEnum } from "../enums/class.enum"

export class CharacterInformation {

    constructor(
        name: string,
        adventurousName: string,
        characterClass: ClassEnum,
        level: number,
        magicItems: MagicItemInformation[],
        totalStrength: number,
        totalDefense: number
    ) {
        this.name = name
        this.adventurousName = adventurousName
        this.class = characterClass
        this.level = level
        this.magicItems = magicItems
        this.totalStrength = totalStrength
        this.totalDefense = totalDefense
    }


    private name: string
    private adventurousName: string
    private class: ClassEnum
    private level: number
    private magicItems: MagicItemInformation[]
    private totalStrength: number
    private totalDefense: number

}