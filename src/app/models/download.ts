export class Download {
    private _url: string;

    constructor(url: string) {
        this._url = url;
    }

    get url(): string {
        return this._url;
    }
}
