import { HttpStatus, Injectable } from "@nestjs/common";
import { ResponseObject } from "src/shared/classes/response-object.class";
import { Validator } from "src/shared/utils/validator";

@Injectable()
export class GetMagicItemsPerCharacterUseCase {

    async execute(id: string): Promise<ResponseObject> {
        const validator: Validator = new Validator();

        if (!validator.isUUID(id)) {
            return new ResponseObject(HttpStatus.BAD_REQUEST, { message: 'Id must be an UUID' });
        }
    }
}