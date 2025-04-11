export class Validator {
    emptyString(value: string): boolean {
        if (typeof value !== 'string') return true;

        if (value.length > 0) return false;

        return true;
    }
}