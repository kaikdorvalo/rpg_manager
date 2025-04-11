import { Crud } from "src/shared/crud/crud.class";
import { MagicItem } from "../../domain/entities/magic-item.entity";
import { Inject } from "@nestjs/common";
import { DataSource } from "typeorm";

export class MagicItemRepository extends Crud<MagicItem> {
    constructor(
        @Inject("DATA_SOURCE")
        private readonly dataSource: DataSource
    ) {
        super(dataSource, MagicItem);
    }
}