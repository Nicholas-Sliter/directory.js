
export const paramMapping = {
  lastName: "ctl00$ctl00$PageContent$PageContent$middDirectoryForm$txtLastName",
  firstName:
    "ctl00$ctl00$PageContent$PageContent$middDirectoryForm$txtFirstName",
  email:
    "ctl00$ctl00$PageContent$PageContent$middDirectoryForm$txtSamaccountname",
  search: "ctl00$ctl00$PageContent$PageContent$middDirectoryForm$btnSearch",
};

export const DIRECTORY_URL = "https://directory.middlebury.edu/";
export const SEARCH_URL = "https://directory.middlebury.edu/default.aspx";
export const PERSON_URL = "https://directory.middlebury.edu/GetRecord.aspx";




export function getPropertyValueByName(root, name){
      let node;
      for (let i = 0; i < root.querySelectorAll("td").length / 2; i++) {
        //convert i to string and pad with 0 if size 1
        const iStr = i.toString().padStart(2, "0");
        if (
          root
            .querySelector(`#rptProperties_ctl${iStr}_lblPropertyName`)
            .text.includes(name)
        ) {
           node = root.querySelector(
            `#rptProperties_ctl${iStr}_lblPropertyValue`
          );
          break;
        }
      }

      return node?.text ?? undefined;

}