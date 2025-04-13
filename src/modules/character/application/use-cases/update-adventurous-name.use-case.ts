import { HttpStatus, Injectable } from "@nestjs/common";
import { UpdateAdventurousNameDto } from "../../presentation/dtos/update-adventurous-name.dto";
import { CharacterRepository } from "../../infrastructure/repositories/character.repository";
import { Validator } from "src/shared/utils/validator";
import { InvalidField } from "src/shared/classes/invalid-fields.class";
import { ResponseObject } from "src/shared/classes/response-object.class";

@Injectable()
export class UpdateAdventurousNameUseCase {

    constructor(
        private readonly characterRepository: CharacterRepository,
    ) { }

    async execute(id: string, updateDto: UpdateAdventurousNameDto): Promise<ResponseObject> {
        const validator: Validator = new Validator();
        let invalidField: InvalidField;

        const exists = await this.characterRepository.findById(id);

        if (!exists) {
            return new ResponseObject(HttpStatus.NOT_FOUND);
        }

        if (validator.emptyString(updateDto.newAdventurousName)) {
            invalidField = new InvalidField('newAdventurousName', 'The new adventurous name cannot be empty.');

            return new ResponseObject(HttpStatus.BAD_REQUEST, { data: { invalidField: invalidField } });
        }

        if (exists.adventurousName !== updateDto.newAdventurousName) {
            await this.characterRepository.update(id, { adventurousName: updateDto.newAdventurousName });
        }

        return new ResponseObject(HttpStatus.OK, { message: 'Update successfully' });
    }
}