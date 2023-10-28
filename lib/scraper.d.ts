import Person from "./person.js";
export declare class Scraper {
    email?: string;
    person: Person;
    id?: string;
    page?: string;
    constructor(email?: string, id?: string);
    init(): Promise<void>;
    private getApsxConstants;
    private getIDByEmail;
}
//# sourceMappingURL=scraper.d.ts.map