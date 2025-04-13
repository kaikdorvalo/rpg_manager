import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { CharacterRepository } from "../../../character/infrastructure/repositories/character.repository";
import { ResponseObject } from "src/shared/classes/response-object.class";
import { Validator } from "src/shared/utils/validator";
import { RemoveCharacterMagicItemDto } from "../../presentation/dtos/remove-character-magic-item.dto";
import { MagicItemRepository } from "../../infrastructure/repositories/magic-item.repository";
import { DataSource } from "typeorm";

@Injectable()
export class RemoveCharacterMagicItemUseCase {
    constructor(
        private readonly characterRepository: CharacterRepository,
        private readonly magicItemRepository: MagicItemRepository,
        @Inject("DATA_SOURCE")
        private readonly dataSource: DataSource,
    ) { }


    async execute(id: string, removeDto: RemoveCharacterMagicItemDto): Promise<ResponseObject> {
        const validator: Validator = new Validator();

        if (!validator.isUUID(id)) {
            return new ResponseObject(HttpStatus.BAD_REQUEST, { message: "Character id must be an UUID" })
        }

        if (!validator.isUUID(removeDto.magicItem)) {
            return new ResponseObject(HttpStatus.BAD_REQUEST, { message: 'Maigc item id must be an UUID' });
        }

        const characterFound = await this.characterRepository.find({ where: { id: id }, relations: { magicItens: true } });

        if (!characterFound[0]) {
            return new ResponseObject(HttpStatus.BAD_REQUEST, { message: 'Character not found' });
        }

        const foundMagicItem = await this.magicItemRepository.findById(removeDto.magicItem);
        if (!foundMagicItem) {
            return new ResponseObject(HttpStatus.BAD_REQUEST, { message: "Magic item not found" });
        }

        const character = characterFound[0];
        let magicItems = await characterFound[0].magicItens;

        if (!magicItems.find((item) => item.id === removeDto.magicItem)) {
            return new ResponseObject(HttpStatus.BAD_REQUEST, { message: "Character doesn't has this magic item" });
        }

        magicItems = magicItems.filter((item) => item.id !== removeDto.magicItem);

        character.magicItens = magicItems;

        await this.dataSource.transaction(async (manager) => {
            await this.characterRepository.save(character, manager);
            await this.magicItemRepository.delete(removeDto.magicItem, manager);
        })

        return new ResponseObject(HttpStatus.OK, { message: "Magic item has been removed" });
    }
}