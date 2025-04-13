import { Module } from "@nestjs/common";
import { CharacterRepository } from "./infrastructure/repositories/character.repository";
import { CharacterController } from "./presentation/controllers/character.controller";
import { DatabaseModule } from "src/infrastrucutre/database/database.module";
import { CreateCharacterUseCase } from "./application/use-cases/create-character.use-case";
import { CharacterService } from "./domain/services/character.service";
import { MagicItemModule } from "../magic_item/magic-item.module";
import { GetCharacterInformationsUseCase } from "./application/use-cases/get-character-informations";
import { GetCharacterByIdUseCase } from "./application/use-cases/get-character-by-id.use-case";

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
        GetCharacterByIdUseCase,
    ],
    exports: [
        CharacterService,
        CharacterRepository,
        CreateCharacterUseCase,
        GetCharacterInformationsUseCase,
        GetCharacterByIdUseCase,
    ]
})
export class CharacterModule { }