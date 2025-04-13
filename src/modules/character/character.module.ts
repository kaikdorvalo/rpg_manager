import { Module } from "@nestjs/common";
import { CharacterRepository } from "./infrastructure/repositories/character.repository";
import { CharacterController } from "./presentation/controllers/character.controller";
import { DatabaseModule } from "src/infrastrucutre/database/database.module";
import { CreateCharacterUseCase } from "./application/use-cases/create-character.use-case";
import { CharacterService } from "./domain/services/character.service";
import { GetCharacterInformationsUseCase } from "./application/use-cases/get-character-informations";
import { GetCharacterByIdUseCase } from "./application/use-cases/get-character-by-id.use-case";
import { UpdateAdventurousNameUseCase } from "./application/use-cases/update-adventurous-name.use-case";
import { RemoveCharacterUseCase } from "./application/use-cases/remove-character.use-case";
import { GetMagicItemsPerCharacterUseCase } from "./application/use-cases/get-magic-items-per-character.use-case";
import { GetChaarcterAmuletUseCase } from "./application/use-cases/get-character-amulet.use-case";

@Module({
    imports: [
        DatabaseModule,
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
        UpdateAdventurousNameUseCase,
        RemoveCharacterUseCase,
        GetMagicItemsPerCharacterUseCase,
        GetChaarcterAmuletUseCase,
    ],
    exports: [
        CharacterService,
        CharacterRepository,
        CreateCharacterUseCase,
        GetCharacterInformationsUseCase,
        GetCharacterByIdUseCase,
        UpdateAdventurousNameUseCase,
        RemoveCharacterUseCase,
        GetMagicItemsPerCharacterUseCase,
        GetChaarcterAmuletUseCase,
    ]
})
export class CharacterModule { }