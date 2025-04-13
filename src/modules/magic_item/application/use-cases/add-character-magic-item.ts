import { CharacterRepository } from "src/modules/character/infrastructure/repositories/character.repository";
import { MagicItemRepository } from "../../infrastructure/repositories/magic-item.repository";
import { addCharacterMagicItemDto } from "../../presentation/dtos/add-character-magic-item.dto";
import { ResponseObject } from "src/shared/classes/response-object.class";
import { HttpStatus, Injectable } from "@nestjs/common";
import { Validator } from "src/shared/utils/validator";
import { MagicItemEnum } from "../../domain/enums/magic-item-type.enum";

@Injectable()
export class AddCharacterMagicItem {
    constructor(
        private readonly characterRepository: CharacterRepository,
        private readonly magicItemRepository: MagicItemRepository,
    ) { }

    async execute(id: string, addMagicItem: addCharacterMagicItemDto) {
        const validator: Validator = new Validator();

        if (!validator.isUUID(id)) {
            return new ResponseObject(HttpStatus.BAD_REQUEST, { message: "Character id must be an UUID" })
        }

        if (!validator.isUUID(addMagicItem.magicItemId)) {
            return new ResponseObject(HttpStatus.BAD_REQUEST, { message: 'Magic item needs to be an UUID' });
        }

        const characterFound = await this.characterRepository.find({ where: { id: id }, relations: { magicItens: true } });
        const magicItem = await this.magicItemRepository.findById(addMagicItem.magicItemId)

        if (!magicItem) {
            return new ResponseObject(HttpStatus.BAD_REQUEST, { message: "Magic item doesn't exists" });
        }

        if (!characterFound[0]) {
            return new ResponseObject(HttpStatus.BAD_REQUEST, { message: 'Character not found' });
        }
        const character = characterFound[0];
        const characterMagicItems = await characterFound[0].magicItens;

        if (characterMagicItems.find((item) => item.id === magicItem.id)) {
            return new ResponseObject(HttpStatus.BAD_REQUEST, { message: "Character Already has this magic item" });
        }

        if (magicItem.itemType === MagicItemEnum.AMULET) {
            if (characterMagicItems.find((item) => item.itemType === MagicItemEnum.AMULET)) {
                return new ResponseObject(HttpStatus.BAD_REQUEST, { message: "Character already has an amulet item" });
            }
        }

        character.magicItens.push(magicItem);

        await this.characterRepository.save(character);

        return new ResponseObject(HttpStatus.OK, { message: "Magic item successfully added" });
    }
}