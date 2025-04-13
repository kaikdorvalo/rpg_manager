import { Module } from "@nestjs/common";
import { MagicItemService } from "./domain/services/magic-item.service";
import { CreateMagicItemUseCase } from "./application/use-cases/create-magic-item.use-case";
import { MagicItemRepository } from "./infrastructure/repositories/magic-item.repository";
import { DatabaseModule } from "src/infrastrucutre/database/database.module";
import { MagicItemController } from "./presentation/controllers/magic-item.controller";
import { ListMagicItemsUseCase } from "./application/use-cases/list-magic-items.use-case";
import { GetMagicItemByIdUseCase } from "./application/use-cases/get-magic-item-by-id.use-case";
import { CharacterModule } from "../character/character.module";
import { AddCharacterMagicItem } from "./application/use-cases/add-character-magic-item";
import { RemoveCharacterMagicItemUseCase } from "./application/use-cases/remove-character-magic_item.use-case";

@Module({
    imports: [
        DatabaseModule,
        CharacterModule
    ],
    providers: [
        MagicItemRepository,
        MagicItemService,

        CreateMagicItemUseCase,
        ListMagicItemsUseCase,
        GetMagicItemByIdUseCase,
        AddCharacterMagicItem,
        RemoveCharacterMagicItemUseCase,
    ],
    controllers: [
        MagicItemController
    ],
    exports: [
        MagicItemRepository,
        MagicItemService,

        CreateMagicItemUseCase,
        ListMagicItemsUseCase,
        GetMagicItemByIdUseCase,
        AddCharacterMagicItem,
        RemoveCharacterMagicItemUseCase,
    ]
})
export class MagicItemModule { }