export class Location {
    private _name: string;
    private _countryCode: string;

    constructor(name: string = "Steyr", countryCode: string = "at") {
        this._name = name;
        this._countryCode = countryCode;
    }

    get name(): string {
        return this._name;
    }
    
    get countryCode(): string {
        return this._countryCode;
    }

    set countryCode(value: string) {
        this._countryCode = value;
    }

    set name(value: string) {
        this._name = value;
    }
}
