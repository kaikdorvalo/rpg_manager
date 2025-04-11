import { Module } from "@nestjs/common";
import { MagicItemService } from "./domain/services/magic-item.service";
import { CreateMagicItemUseCase } from "./application/use-cases/create-magic-item.use-case";
import { MagicItemRepository } from "./infrastructure/repositories/magic-item.repository";
import { DatabaseModule } from "src/infrastrucutre/database/database.module";
import { MagicItemController } from "./presentation/controllers/magic-item.controller";

@Module({
    imports: [
        DatabaseModule
    ],
    providers: [
        MagicItemRepository,
        MagicItemService,

        CreateMagicItemUseCase,
    ],
    controllers: [
        MagicItemController
    ],
    exports: [
        MagicItemRepository,
        MagicItemService,

        CreateMagicItemUseCase
    ]
})
export class MagicItemModule { }