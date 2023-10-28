import Person from "./person.js";
export declare class Scraper {
    email?: string;
    person: Person;
    id?: string;
    page?: string;
    firstName?: string;
    lastName?: string;
    constructor(email?: string, id?: string, firstName?: string, lastName?: string);
    init(): Promise<void>;
    private getApsxConstants;
    private getPageByNameAndId;
    private getIDByEmail;
}
//# sourceMappingURL=scraper.d.ts.map