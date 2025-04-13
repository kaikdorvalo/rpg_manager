import { ResponseObject } from "src/shared/classes/response-object.class";
import { CharacterRepository } from "../../infrastructure/repositories/character.repository";
import { HttpStatus, Injectable } from "@nestjs/common";
import { Validator } from "src/shared/utils/validator";

@Injectable()
export class RemoveCharacterUseCase {
    constructor(
        private readonly characterRepository: CharacterRepository
    ) { }

    async execute(id: string): Promise<ResponseObject> {
        const validator: Validator = new Validator();

        if (!validator.isUUID(id)) {
            return new ResponseObject(HttpStatus.BAD_REQUEST, { message: "Character id must be an UUID" })
        }

        const exists = await this.characterRepository.findById(id);

        if (!exists) {
            return new ResponseObject(HttpStatus.NOT_FOUND);
        }

        await this.characterRepository.delete(id);

        return new ResponseObject(HttpStatus.OK, { data: 'Character removed' });
    }
}