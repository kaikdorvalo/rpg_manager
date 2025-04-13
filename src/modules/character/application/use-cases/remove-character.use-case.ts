import { ResponseObject } from "src/shared/classes/response-object.class";
import { CharacterRepository } from "../../infrastructure/repositories/character.repository";
import { HttpStatus, Injectable } from "@nestjs/common";

@Injectable()
export class RemoveCharacterUseCase {
    constructor(
        private readonly characterRepository: CharacterRepository
    ) { }

    async execute(id: string): Promise<ResponseObject> {
        const exists = await this.characterRepository.findById(id);

        if (!exists) {
            return new ResponseObject(HttpStatus.NOT_FOUND);
        }

        await this.characterRepository.delete(id);

        return new ResponseObject(HttpStatus.OK, { data: 'Character removed' });
    }
}