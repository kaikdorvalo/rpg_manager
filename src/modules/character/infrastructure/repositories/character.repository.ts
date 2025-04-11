import { Crud } from "src/shared/crud/crud.class";
import { Character } from "../../domain/entities/character.entity";
import { DataSource } from "typeorm";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class CharacterRepository extends Crud<Character> {
    constructor(
        @Inject("DATA_SOURCE")
        private readonly dataSource: DataSource
    ) {
        super(dataSource, Character);
    }
}