import Person from "./person.js";
export declare class Scraper {
    email?: string;
    person: Person;
    id?: string;
    constructor(email?: string, id?: string);
    init(): Promise<void>;
    private getIDByEmail;
}
//# sourceMappingURL=scraper.d.ts.map