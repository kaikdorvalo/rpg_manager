import { Injectable } from "@nestjs/common";
import { Character } from "../entities/character.entity";
import { ValidationResult } from "src/shared/classes/ValidationResult";
import { InvalidField } from "src/shared/classes/invalid-fields.class";
import { Validator } from "src/shared/utils/validator";
import { ClassEnum } from "../enums/class.enum";
import { MagicItemRepository } from "src/modules/magic_item/infrastructure/repositories/magic-item.repository";
import { MagicItemEnum } from "src/modules/magic_item/domain/enums/magic-item-type.enum";
import { MagicItem } from "src/modules/magic_item/domain/entities/magic-item.entity";

@Injectable()
export class CharacterService {
    constructor(
        private readonly magicItemRepository: MagicItemRepository
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

        if (character.magicItens.length > 0) {
            let validatedMagicItems = await this.validateCharacterMagicItems(character);
            if (!validatedMagicItems.valid) {
                invalidFields.push(...validatedMagicItems.invalidFields);
            }
        }


        const validated = invalidFields.length === 0;

        return new ValidationResult(validated, invalidFields);
    }

    // lembrar de colocar validação de itens iguais nessa bomba
    async validateCharacterMagicItems(character: Character): Promise<ValidationResult> {
        let invalidFields: InvalidField[] = []

        let queries = character.magicItens.map((magicItem) => {
            return this.magicItemRepository.findById(magicItem.id);
        })

        const result = await Promise.all(queries);
        const validMagicItems = result.filter((magicItem) => magicItem !== null);
        if (validMagicItems.length - result.length !== 0) {
            invalidFields.push(new InvalidField('magicItems', 'Invalid magic item(s)'))
        }

        let validateAmulet = validMagicItems.filter((magicItem) => magicItem.itemType === MagicItemEnum.AMULET);
        if (validateAmulet.length > 1) {
            invalidFields.push(new InvalidField('magicItems', `One amulet item limit exceded. You provided ${validateAmulet.length}`));
        }

        let validated = invalidFields.length === 0;

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