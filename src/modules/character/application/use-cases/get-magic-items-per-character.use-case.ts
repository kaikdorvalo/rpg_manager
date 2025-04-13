import { HttpStatus, Injectable } from "@nestjs/common";
import { ResponseObject } from "src/shared/classes/response-object.class";
import { Validator } from "src/shared/utils/validator";
import { CharacterRepository } from "../../infrastructure/repositories/character.repository";

@Injectable()
export class GetMagicItemsPerCharacterUseCase {

    constructor(
        private readonly characterRepository: CharacterRepository
    ) { }

    async execute(id: string): Promise<ResponseObject> {
        const validator: Validator = new Validator();

        if (!validator.isUUID(id)) {
            return new ResponseObject(HttpStatus.BAD_REQUEST, { message: 'Id must be an UUID' });
        }

        const characterFound = await this.characterRepository.find({ where: { id: id }, relations: { magicItens: true } });
        if (!characterFound[0]) {
            return new ResponseObject(HttpStatus.NOT_FOUND, { message: "Not found character" });
        }

        const magicItems = await characterFound[0].magicItens;

        return new ResponseObject(HttpStatus.OK, { data: magicItems });
    }
}