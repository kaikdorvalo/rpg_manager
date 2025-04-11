import { Inject, Injectable } from "@nestjs/common";
import { CharacterRepository } from "../../infrastructure/repositories/character.repository";
import { CreateCharacterDto } from "../../presentation/dtos/CreateCharacter.dto";
import { DataSource } from "typeorm";

@Injectable()
export class CreateCharacterUseCase {

    constructor(
        private readonly characterRepository: CharacterRepository,
        @Inject("DATA_SOURCE")
        private readonly dataSource: DataSource
    ) { }

    async execute(createCharacterDto: CreateCharacterDto) {

        return await this.dataSource.transaction(async (manager) => {
            const character = await this.characterRepository.create(createCharacterDto, manager);

            return character
        })
    }
}