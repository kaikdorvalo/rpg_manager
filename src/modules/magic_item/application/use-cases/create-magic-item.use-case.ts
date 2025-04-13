import { HttpStatus, Injectable } from "@nestjs/common";
import { CreateCharacterDto } from "src/modules/character/presentation/dtos/CreateCharacter.dto";
import { MagicItemService } from "../../domain/services/magic-item.service";
import { MagicItemRepository } from "../../infrastructure/repositories/magic-item.repository";
import { CreateMagicItemDto } from "../../presentation/dtos/create-magic-item.dto";
import { ResponseObject } from "src/shared/classes/response-object.class";
import { CharacterRepository } from "src/modules/character/infrastructure/repositories/character.repository";
import { Validator } from "src/shared/utils/validator";
import { Character } from "src/modules/character/domain/entities/character.entity";
import { MagicItemEnum } from "../../domain/enums/magic-item-type.enum";

@Injectable()
export class CreateMagicItemUseCase {
    constructor(
        private readonly magicItemService: MagicItemService,
        private readonly characterRepository: CharacterRepository,
        private readonly magicItemRepository: MagicItemRepository,
    ) { }

    async execute(createMagicItemDto: CreateMagicItemDto): Promise<ResponseObject> {
        const validator: Validator = new Validator();

        if (!validator.isUUID(createMagicItemDto.characterId)) {
            return new ResponseObject(HttpStatus.BAD_REQUEST, { message: 'Invalid character id' })
        }

        const magicItem = this.magicItemRepository.create(createMagicItemDto);
        magicItem.character = new Character();
        magicItem.character.id = createMagicItemDto.characterId;
        const validItem = this.magicItemService.validateMagicItem(magicItem);


        if (validItem.valid) {
            const characterFound = await this.characterRepository.find({ where: { id: magicItem.character.id }, relations: { magicItens: true } });

            if (!characterFound[0]) {
                return new ResponseObject(HttpStatus.BAD_REQUEST, { message: `Character with id ${magicItem.character.id} doesn't exists.` })
            }

            const character = characterFound[0];
            const magicItems = await characterFound[0].magicItens;

            if (magicItem.itemType === MagicItemEnum.AMULET) {
                if (magicItems.find((item) => item.itemType === MagicItemEnum.AMULET)) {
                    return new ResponseObject(HttpStatus.CONFLICT, { message: 'Character already has an amulet item' });
                }
            }

            if (!character) {
                return new ResponseObject(HttpStatus.BAD_REQUEST, { message: `Character with id ${magicItem.character.id} doesn't exists.` })
            }

            await this.magicItemRepository.save(magicItem);
            return new ResponseObject(HttpStatus.CREATED, { message: 'Magic item successfully created' });
        }

        return new ResponseObject(HttpStatus.BAD_REQUEST, { data: { invalidFields: validItem.invalidFields } });
    }
}