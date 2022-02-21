import parse from 'node-html-parser';

export const paramMapping = {
  lastName: "ctl00$ctl00$PageContent$PageContent$middDirectoryForm$txtLastName",
  firstName:
    "ctl00$ctl00$PageContent$PageContent$middDirectoryForm$txtFirstName",
  email:
    "ctl00$ctl00$PageContent$PageContent$middDirectoryForm$txtSamaccountname",
  search: "ctl00$ctl00$PageContent$PageContent$middDirectoryForm$btnSearch",
};




export const getPersonID = (html: string): string => {
  const root = parse(html);
  const node = root.querySelector(
    "#ctl00_ctl00_PageContent_PageContent_middDirectoryForm_lstResults_ctl02_lnkName"
  );
    console.log(node);
  const personID = node.rawAttrs.split("'")[1];
  return personID;
}


export const DIRECTORY_URL = "https://directory.middlebury.edu/";
export const SEARCH_URL = "https://directory.middlebury.edu/default.aspx";
export const PERSON_URL = "https://directory.middlebury.edu/GetRecord.aspx";

