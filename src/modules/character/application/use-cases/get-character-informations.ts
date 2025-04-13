import { HttpStatus, Injectable } from "@nestjs/common";
import { CharacterRepository } from "../../infrastructure/repositories/character.repository";
import { ResponseObject } from "src/shared/classes/response-object.class";
import { MagicItemInformation } from "src/modules/magic_item/domain/class/MagicItemInformation.class";
import { MagicItem } from "src/modules/magic_item/domain/entities/magic-item.entity";
import { CharacterInformation } from "../../domain/class/character-information.class";

@Injectable()
export class GetCharacterInformationsUseCase {
    constructor(
        private readonly characterRepository: CharacterRepository
    ) { }

    async execute(id: string): Promise<ResponseObject> {
        const findCharacter = await this.characterRepository.find({ where: { id: id }, relations: { magicItens: true } })
        if (!findCharacter[0]) {
            return new ResponseObject(HttpStatus.NOT_FOUND);
        }

        const character = findCharacter[0];
        const magicItems = await character.magicItens;

        const magicItemsInformations: MagicItemInformation[] = [];

        let totalStrength = character.strength;
        let totalDefense = character.defense;

        for (let item of magicItems) {
            magicItemsInformations.push(new MagicItemInformation(item.name, item.itemType, item.strength, item.defense))
            totalStrength += item.strength;
            totalDefense += item.defense;
        }

        const characterInformations = new CharacterInformation(character.name, character.adventurousName, character.class, character.level, magicItemsInformations, totalStrength, totalDefense);

        return new ResponseObject(HttpStatus.OK, { data: characterInformations });
    }
}

