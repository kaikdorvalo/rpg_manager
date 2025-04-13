import { ResponseObject } from "src/shared/classes/response-object.class";
import { Character } from "../../domain/entities/character.entity";
import { CharacterRepository } from "../../infrastructure/repositories/character.repository";
import { HttpStatus, Injectable } from "@nestjs/common";

@Injectable()
export class GetCharacterByIdUseCase {

    constructor(
        private readonly characterRepository: CharacterRepository
    ) { }

    async execute(id: string): Promise<ResponseObject> {
        const character = await this.characterRepository.findById(id);

        if (character) {
            return new ResponseObject(HttpStatus.OK, { data: character });
        }

        return new ResponseObject(HttpStatus.NOT_FOUND);
    }
}