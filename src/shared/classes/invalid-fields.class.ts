export class InvalidField {
    fieldName: string
    description: string

    constructor(fieldName: string, description: string) {
        this.fieldName = fieldName;
        this.description = description;
    }
}