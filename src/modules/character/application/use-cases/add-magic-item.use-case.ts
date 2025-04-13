import { HttpStatus, Injectable } from "@nestjs/common";
import { CharacterRepository } from "../../infrastructure/repositories/character.repository";
import { GetCharacterByIdUseCase } from "./get-character-by-id.use-case";
import { addCharacterMagicItemDto } from "../../presentation/dtos/add-character-magic-item.dto";
import { Character } from "../../domain/entities/character.entity";
import { ResponseObject } from "src/shared/classes/response-object.class";
import { MagicItemRepository } from "src/modules/magic_item/infrastructure/repositories/magic-item.repository";
import { InvalidField } from "src/shared/classes/invalid-fields.class";
import { exists } from "fs";
import { MagicItemEnum } from "src/modules/magic_item/domain/enums/magic-item-type.enum";
import { MagicItem } from "src/modules/magic_item/domain/entities/magic-item.entity";
import { Validator } from "src/shared/utils/validator";

@Injectable()
export class AddMagicItemUseCase {
    constructor(
        private readonly characterRepository: CharacterRepository,
        private readonly magicItemRepository: MagicItemRepository,
    ) { }

    async execute(id: string, addCharacterMagicItem: addCharacterMagicItemDto): Promise<ResponseObject> {
        const validator: Validator = new Validator();

        if (!validator.isUUID(addCharacterMagicItem.magicItemId)) {
            return new ResponseObject(HttpStatus.BAD_REQUEST, { message: 'magicItemId must be an uuid' });
        }

        if (validator.emptyString(addCharacterMagicItem.magicItemId)) {
            return new ResponseObject(HttpStatus.BAD_REQUEST, { data: { invalidField: new InvalidField('magicItemId', `The magic item id is required`) } })
        }

        let characterMagicItens: MagicItem[] = [];

        const resolved = await Promise.all(
            [
                this.characterRepository.find({ where: { id: id }, relations: { magicItens: true } }),
                this.magicItemRepository.findById(addCharacterMagicItem.magicItemId)
            ]
        )

        const character = resolved[0][0];
        const magicItem = resolved[1];



        if (!magicItem) {
            return new ResponseObject(HttpStatus.BAD_REQUEST, { data: { invalidField: new InvalidField('magicItemId', `Doesn't exists a magic item with id ${addCharacterMagicItem.magicItemId}`) } })
        }

        if (character) {
            characterMagicItens = await character.magicItens;
        } else {
            return new ResponseObject(HttpStatus.NOT_FOUND)
        }

        const existsInArray = characterMagicItens.find((item) => item.id === addCharacterMagicItem.magicItemId);
        if (existsInArray) {
            return new ResponseObject(HttpStatus.BAD_REQUEST, { message: `Character already has the item with id ${addCharacterMagicItem.magicItemId}` });
        }

        if (magicItem.itemType === MagicItemEnum.AMULET) {
            const alreadyHaveAnAmulet = characterMagicItens.find((item) => item.itemType === MagicItemEnum.AMULET);
            if (alreadyHaveAnAmulet) {
                return new ResponseObject(HttpStatus.CONFLICT, { message: `Character already has an amulet item` });
            }
        }

        characterMagicItens.push(magicItem);

        character.magicItens = characterMagicItens;

        await this.characterRepository.save(character);

        return new ResponseObject(HttpStatus.OK, { message: 'The item has been added' });

    }
}