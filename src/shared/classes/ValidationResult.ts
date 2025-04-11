import { InvalidField } from "./invalid-fields.class"

export class ValidationResult {
    valid: boolean
    invalidFields?: InvalidField[]

    constructor(valid: boolean, invalidFields?: InvalidField[]) {
        this.valid = valid;
        this.invalidFields = invalidFields;
    }
}