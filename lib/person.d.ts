export default class Person {
    id: string;
    private page?;
    firstName: string;
    lastName: string;
    email: string;
    type: string;
    gradYear?: string;
    department?: string;
    constructor(id: any, page?: any);
    init(): Promise<void>;
    private __getPersonDetailsFromDirectoryPage;
    private __getPersonDetailsById;
    private __getPersonDetailsByPage;
}
//# sourceMappingURL=person.d.ts.map