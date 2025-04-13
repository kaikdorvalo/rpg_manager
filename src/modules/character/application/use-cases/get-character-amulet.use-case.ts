import { HttpStatus, Injectable } from "@nestjs/common";
import { CharacterRepository } from "../../infrastructure/repositories/character.repository";
import { ResponseObject } from "src/shared/classes/response-object.class";
import { MagicItemEnum } from "src/modules/magic_item/domain/enums/magic-item-type.enum";
import { Validator } from "src/shared/utils/validator";

@Injectable()
export class GetChaarcterAmuletUseCase {
    constructor(
        private readonly characterRepository: CharacterRepository
    ) { }

    async execute(id: string): Promise<ResponseObject> {
        const validator: Validator = new Validator();

        if (!validator.isUUID(id)) {
            return new ResponseObject(HttpStatus.BAD_REQUEST, { message: "Character id must be an UUID" })
        }


        const characterFound = await this.characterRepository.find({ where: { id: id }, relations: { magicItens: true } });

        if (!characterFound[0]) {
            return new ResponseObject(HttpStatus.NOT_FOUND, { message: "Character not found" });
        }

        const magicItens = await characterFound[0].magicItens;

        const amulet = magicItens.find((item) => item.itemType === MagicItemEnum.AMULET);

        return new ResponseObject(HttpStatus.OK, { data: amulet });
    }
}