export class Validator {
    emptyString(value: string): boolean {
        if (typeof value !== 'string') return true;

        if (value.length > 0) return false;

        return true;
    }

    isUUID(value: string) {
        if (typeof value !== 'string') return false;

        const values = value.split('-');

        return values[0].length === 8 && values[1].length === 4 && values[2].length === 4 && values[3].length === 4 && values[4].length === 12;
    }
}