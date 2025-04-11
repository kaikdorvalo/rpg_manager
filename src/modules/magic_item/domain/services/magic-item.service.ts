import { Injectable } from "@nestjs/common";
import { MagicItem } from "../entities/magic-item.entity";
import { InvalidField } from "src/shared/classes/invalid-fields.class";
import { MagicItemEnum } from "../enums/magic-item-type.enum";
import { ValidationResult } from "src/shared/classes/ValidationResult";
import { Character } from "src/modules/character/domain/entities/character.entity";

@Injectable()
export class MagicItemService {

    // validateMagicItems(magicItems: MagicItem): ValidationResult {
    //     let invalidFields: InvalidField[] = []

    //     for (let item of character.magicItens) {

    //         let itemTypeValidation = this.validateMagicItemType(item.itemType);
    //         if (!itemTypeValidation.valid) {
    //             invalidFields.push(...itemTypeValidation.invalidFields)
    //         }

    //         let validationItemsType: ValidationResult
    //         switch (item.itemType) {
    //             case MagicItemEnum.ARMOR:
    //                 validationItemsType = this.validateArmorItemType(item);
    //                 if (!validationItemsType.valid) {
    //                     invalidFields.push(...validationItemsType.invalidFields);
    //                 }
    //                 break;
    //             case MagicItemEnum.WEAPON:
    //                 validationItemsType = this.validateWeaponItemType(item);
    //                 if (!validationItemsType.valid) {
    //                     invalidFields.push(...validationItemsType.invalidFields);
    //                 }
    //                 break;
    //         }

    //         let validateStrength = this.validateItemStrength(item);
    //         if (!validateStrength.valid) {
    //             invalidFields.push(...validateStrength.invalidFields);
    //         }

    //         let validateDefense = this.validateItemDefense(item);
    //         if (!validateDefense.valid) {
    //             invalidFields.push(...validateDefense.invalidFields);
    //         }
    //     }

    //     let validateAmuletsAmount = this.validateAmuletItemAmount(character);
    //     if (!validateAmuletsAmount.valid) {
    //         invalidFields.push(...validateAmuletsAmount.invalidFields);
    //     }

    //     let validCharacter = invalidFields.length === 0;

    //     return new ValidationResult(validCharacter, invalidFields);
    // }

    validateMagicItem(magicItem: MagicItem): ValidationResult {
        let invalidFields: InvalidField[] = []

        let validTypeEnum = this.validateMagicItemTypeEnum(magicItem);
        if (!validTypeEnum.valid) {
            invalidFields.push(...validTypeEnum.invalidFields);
        }

        let validType = this.validateItemType(magicItem);
        if (!validType.valid) {
            invalidFields.push(...validType.invalidFields);
        }

        let validateStrength = this.validateItemStrength(magicItem);
        if (!validateStrength.valid) {
            invalidFields.push(...validateStrength.invalidFields);
        }

        let validateDefense = this.validateItemDefense(magicItem);
        if (!validateDefense.valid) {
            invalidFields.push(...validateDefense.invalidFields);
        }

        let validateStrengthAndDefense = this.validateStrengthAndDefense(magicItem);
        if (!validateStrengthAndDefense.valid) {
            invalidFields.push(...validateStrengthAndDefense.invalidFields);
        }

        const validated = invalidFields.length === 0;

        return new ValidationResult(validated, invalidFields);
    }

    validateStrengthAndDefense(magicItem: MagicItem): ValidationResult {
        let validation: ValidationResult

        if (magicItem.strength === 0 && magicItem.defense === 0) {
            validation = new ValidationResult(false, [new InvalidField('strength, defense', 'These fiedls cannot be zero at the same time ')])
            return validation
        }

        return new ValidationResult(true);
    }

    validateItemType(magicItem: MagicItem): ValidationResult {
        let validation: ValidationResult
        switch (magicItem.itemType) {
            case MagicItemEnum.ARMOR:
                validation = this.validateArmorItemType(magicItem);
                if (!validation.valid) {
                    return validation
                }
                break;
            case MagicItemEnum.WEAPON:
                validation = this.validateWeaponItemType(magicItem);
                if (!validation.valid) {
                    return validation
                }
                break;
        }

        return new ValidationResult(true);
    }


    validateMagicItemTypeEnum(magicItem: MagicItem): ValidationResult {
        if (magicItem.itemType.toUpperCase() in MagicItemEnum) {
            return new ValidationResult(true);
        }

        return new ValidationResult(false, [new InvalidField('itemType', `${magicItem.itemType} isn't a valid item type`)]);
    }

    validateWeaponItemType(magicItem: MagicItem): ValidationResult {
        if (magicItem.itemType === MagicItemEnum.WEAPON) {
            if (magicItem.defense === 0) {
                return new ValidationResult(true);
            }
        }

        return new ValidationResult(false, [new InvalidField('defense', `Defense must be 0 for item type ${magicItem.itemType}`)])
    }

    validateArmorItemType(magicItem: MagicItem): ValidationResult {
        if (magicItem.itemType === MagicItemEnum.ARMOR) {
            if (magicItem.strength === 0) {
                return new ValidationResult(true);
            }
        }

        return new ValidationResult(false, [new InvalidField('strength', `Strength must be 0 for item type ${magicItem.itemType}`)])
    }

    validateAmuletItemAmount(character: Character): ValidationResult {
        const amulets = character.magicItens.filter((item) => item.itemType === MagicItemEnum.AMULET);

        if (amulets.length > 1) {
            return new ValidationResult(false, [new InvalidField('magicItems', 'Character must have only one amulet item')]);
        }

        return new ValidationResult(true);
    }

    validateItemStrength(magicItem: MagicItem): ValidationResult {
        if (magicItem.strength >= 0 && magicItem.strength <= 10) {
            return new ValidationResult(true);
        }

        return new ValidationResult(false, [new InvalidField('strength', `Invalid value ${magicItem.strength}. Max: 10, Min: 0`)])
    }

    validateItemDefense(magicItem: MagicItem): ValidationResult {
        if (magicItem.defense >= 0 && magicItem.defense <= 10) {
            return new ValidationResult(true);
        }

        return new ValidationResult(false, [new InvalidField('defense', `Invalid value ${magicItem.strength}. Max: 10, Min: 0`)])
    }


}