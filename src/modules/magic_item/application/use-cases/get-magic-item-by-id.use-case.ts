import { Validator } from "src/shared/utils/validator";
import { MagicItemRepository } from "../../infrastructure/repositories/magic-item.repository";
import { ResponseObject } from "src/shared/classes/response-object.class";
import { HttpStatus, Injectable } from "@nestjs/common";

@Injectable()
export class GetMagicItemByIdUseCase {
    constructor(
        private readonly magicItemRepository: MagicItemRepository
    ) { }

    async execute(id: string): Promise<ResponseObject> {
        const validator: Validator = new Validator();

        if (!validator.isUUID(id)) {
            return new ResponseObject(HttpStatus.BAD_REQUEST, { message: 'The magic item id must be an uuid' });
        }

        const found = await this.magicItemRepository.findById(id);

        if (found) {
            return new ResponseObject(HttpStatus.OK, { data: found });
        }

        return new ResponseObject(HttpStatus.NOT_FOUND);
    }
}