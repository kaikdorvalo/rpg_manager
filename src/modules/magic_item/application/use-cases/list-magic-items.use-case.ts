import { HttpStatus, Injectable } from "@nestjs/common";
import { MagicItemRepository } from "../../infrastructure/repositories/magic-item.repository";
import { ResponseObject } from "src/shared/classes/response-object.class";

@Injectable()
export class ListMagicItemsUseCase {
    constructor(
        private readonly magicItemRepository: MagicItemRepository
    ) { }


    async execute(): Promise<ResponseObject> {
        const items = await this.magicItemRepository.findAll();

        return new ResponseObject(HttpStatus.OK, { data: items });
    }
}