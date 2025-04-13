import { Module } from "@nestjs/common";
import { CharacterRepository } from "./infrastructure/repositories/character.repository";
import { CharacterController } from "./presentation/controllers/character.controller";
import { DatabaseModule } from "src/infrastrucutre/database/database.module";
import { CreateCharacterUseCase } from "./application/use-cases/create-character.use-case";
import { CharacterService } from "./domain/services/character.service";
import { MagicItemModule } from "../magic_item/magic-item.module";
import { GetCharacterInformationsUseCase } from "./application/use-cases/get-character-informations";

@Module({
    imports: [
        DatabaseModule,
        MagicItemModule
    ],
    controllers: [
        CharacterController
    ],
    providers: [
        CharacterService,
        CharacterRepository,
        CreateCharacterUseCase,
        GetCharacterInformationsUseCase,
    ],
    exports: [
        CharacterService,
        CharacterRepository,
        CreateCharacterUseCase,
        GetCharacterInformationsUseCase,
    ]
})
export class CharacterModule { }