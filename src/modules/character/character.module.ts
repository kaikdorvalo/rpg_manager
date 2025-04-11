import { Module } from "@nestjs/common";
import { CharacterRepository } from "./infrastructure/repositories/character.repository";
import { CharacterController } from "./presentation/controllers/character.controller";
import { DatabaseModule } from "src/infrastrucutre/database/database.module";
import { CreateCharacterUseCase } from "./application/use-cases/create-character.use-case";

@Module({
    imports: [
        DatabaseModule
    ],
    controllers: [
        CharacterController
    ],
    providers: [
        CharacterRepository,
        CreateCharacterUseCase
    ],
    exports: [
        CharacterRepository,
        CreateCharacterUseCase
    ]
})
export class CharacterModule { }