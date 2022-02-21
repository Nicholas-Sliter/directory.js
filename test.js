import fetch from "node-fetch";
import { viewstate, eventvalidation } from "./src/constants.js";
import {parse} from "node-html-parser";
 
const email = "nsliter@middlebury.edu";

const urlEncoded = new URLSearchParams();

urlEncoded.append("__VIEWSTATE", viewstate);
urlEncoded.append("__EVENTVALIDATION", eventvalidation);
urlEncoded.append(
  "ctl00$ctl00$PageContent$PageContent$middDirectoryForm$txtSamaccountname", email
);
urlEncoded.append(
  "ctl00$ctl00$PageContent$PageContent$middDirectoryForm$btnSearch",
  "Search"
);


const requestOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": "ASP.NET_SessionId=orauz5z5ytfp3ebtz0r3eehv",
  },
  body: urlEncoded,
  redirect: "follow",
};

async function test(){
  const res = await fetch("https://directory.middlebury.edu/", requestOptions);
  const text = await res.text();
  const root = parse(text);
  const table = root.querySelector("tblResults");
  //console.log(text);
  const linkNode = root.querySelector(
    "#ctl00_ctl00_PageContent_PageContent_middDirectoryForm_lstResults_ctl02_lnkName"
  );
  const link = linkNode.attributes.href;
  console.log(link);


}

test();

/**fetch("https://directory.middlebury.edu/default.aspx", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));



  **/

  /**
   * 
   * 
   *     __VIEWSTATE: viewstate,
    __EVENTVALIDATION: eventvalidation,
    ctl00$ctl00$PageContent$PageContent$middDirectoryForm$txtSamaccountname: email,
    ctl00$ctl00$PageContent$PageContent$middDirectoryForm$btnSearch: "Search",
   */