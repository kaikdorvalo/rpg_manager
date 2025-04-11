import { HttpStatus, Injectable } from "@nestjs/common";
import { CreateCharacterDto } from "src/modules/character/presentation/dtos/CreateCharacter.dto";
import { MagicItemService } from "../../domain/services/magic-item.service";
import { MagicItemRepository } from "../../infrastructure/repositories/magic-item.repository";
import { CreateMagicItemDto } from "../../presentation/dtos/create-magic-item.dto";
import { ResponseObject } from "src/shared/classes/response-object.class";

@Injectable()
export class CreateMagicItemUseCase {
    constructor(
        private readonly magicItemService: MagicItemService,
        private readonly magicItemRepository: MagicItemRepository
    ) { }

    async execute(createMagicItemDto: CreateMagicItemDto): Promise<ResponseObject> {
        const magicItem = this.magicItemRepository.create(createMagicItemDto);
        const validItem = this.magicItemService.validateMagicItem(magicItem);


        if (validItem.valid) {
            await this.magicItemRepository.save(magicItem);
            return new ResponseObject(HttpStatus.CREATED, { message: 'Magic item successfully created' });
        }

        return new ResponseObject(HttpStatus.BAD_REQUEST, { data: { invalidFields: validItem.invalidFields } });
    }
}