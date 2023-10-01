export const paramMapping = {
    lastName: "ctl00$ctl00$PageContent$PageContent$middDirectoryForm$txtLastName",
    firstName: "ctl00$ctl00$PageContent$PageContent$middDirectoryForm$txtFirstName",
    email: "ctl00$ctl00$PageContent$PageContent$middDirectoryForm$txtSamaccountname",
    search: "ctl00$ctl00$PageContent$PageContent$middDirectoryForm$btnSearch",
};
export const DIRECTORY_URL = "https://directory.middlebury.edu/";
export const SEARCH_URL = "https://directory.middlebury.edu/";
export const PERSON_URL = "https://directory.middlebury.edu/";
export function getPropertyValueByName(root, name) {
    /* dt elements are used to store the property names, dd stores value */
    const dtElements = root.querySelectorAll("dt");
    const ddElements = root.querySelectorAll("dd");
    for (let i = 0; i < dtElements.length; i++) {
        if (dtElements[i].text.toLowerCase() === name.toLowerCase()) {
            return ddElements[i].text;
        }
    }
    return undefined;
}
