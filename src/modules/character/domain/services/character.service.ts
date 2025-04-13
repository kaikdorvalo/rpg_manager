import { Injectable } from "@nestjs/common";
import { Character } from "../entities/character.entity";
import { ValidationResult } from "src/shared/classes/ValidationResult";
import { InvalidField } from "src/shared/classes/invalid-fields.class";
import { Validator } from "src/shared/utils/validator";
import { ClassEnum } from "../enums/class.enum";

@Injectable()
export class CharacterService {
    constructor(
    ) { }

    public validator = new Validator();

    async validateCharacter(character: Character): Promise<ValidationResult> {
        let invalidFields: InvalidField[] = [];

        if (this.validator.emptyString(character.name)) {
            invalidFields.push(new InvalidField('name', 'Name must be a not empty string'));
        }

        if (this.validator.emptyString(character.adventurousName)) {
            invalidFields.push(new InvalidField('adventurousName', 'Must be a not empty string'));
        }

        let validateClass = this.validateCharacterClass(character);
        if (!validateClass.valid) {
            invalidFields.push(...validateClass.invalidFields);
        }

        let validateStrengthAndDefense = this.validateStrengthAndDefense(character);
        if (!validateStrengthAndDefense.valid) {
            invalidFields.push(...validateStrengthAndDefense.invalidFields);
        }

        const validated = invalidFields.length === 0;

        return new ValidationResult(validated, invalidFields);
    }

    validateCharacterClass(character: Character) {
        if (character.class.toUpperCase() in ClassEnum) {
            return new ValidationResult(true);
        }

        return new ValidationResult(false, [new InvalidField('class', `Class ${character.class} is a invalid class`)])
    }

    validateStrengthAndDefense(character: Character) {
        let sum = character.strength + character.defense;

        if (sum <= 10 && sum >= 0) {
            return new ValidationResult(true)
        }

        return new ValidationResult(false, [new InvalidField('strength, defense', `Fields sum (${sum} points) invalid value. Max: 10, Min: 0`)])
    }
}