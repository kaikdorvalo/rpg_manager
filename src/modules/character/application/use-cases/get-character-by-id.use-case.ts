import { ResponseObject } from "src/shared/classes/response-object.class";
import { Character } from "../../domain/entities/character.entity";
import { CharacterRepository } from "../../infrastructure/repositories/character.repository";
import { HttpStatus, Injectable } from "@nestjs/common";
import { Validator } from "src/shared/utils/validator";

@Injectable()
export class GetCharacterByIdUseCase {

    constructor(
        private readonly characterRepository: CharacterRepository
    ) { }

    async execute(id: string): Promise<ResponseObject> {
        const validator: Validator = new Validator();

        if (!validator.isUUID(id)) {
            return new ResponseObject(HttpStatus.BAD_REQUEST, { message: "Character id must be an UUID" })
        }


        const character = await this.characterRepository.findById(id);

        if (character) {
            return new ResponseObject(HttpStatus.OK, { data: character });
        }

        return new ResponseObject(HttpStatus.NOT_FOUND);
    }
}