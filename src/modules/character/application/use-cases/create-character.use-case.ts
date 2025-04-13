import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { CharacterRepository } from "../../infrastructure/repositories/character.repository";
import { CreateCharacterDto } from "../../presentation/dtos/CreateCharacter.dto";
import { DataSource } from "typeorm";
import { CharacterService } from "../../domain/services/character.service";
import { ResponseObject } from "src/shared/classes/response-object.class";

@Injectable()
export class CreateCharacterUseCase {

    constructor(
        private readonly characterRepository: CharacterRepository,
        @Inject("DATA_SOURCE")
        private readonly dataSource: DataSource,
        private readonly characterService: CharacterService
    ) { }

    async execute(createCharacterDto: CreateCharacterDto) {

        let character = this.characterRepository.create(createCharacterDto);
        character.magicItens = [];

        let validCharacter = await this.characterService.validateCharacter(character);

        if (validCharacter.valid) {
            await this.characterRepository.save(character);
            return new ResponseObject(HttpStatus.CREATED, { message: 'Character successfully created' });
        }

        return new ResponseObject(HttpStatus.BAD_REQUEST, { data: { invalidFields: validCharacter.invalidFields } });

    }
}