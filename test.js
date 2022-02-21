import fetch from "node-fetch";
import { viewstate, eventvalidation } from "./constants.js";

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

fetch("https://directory.middlebury.edu/default.aspx", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));



  /**
   * 
   * 
   *     __VIEWSTATE: viewstate,
    __EVENTVALIDATION: eventvalidation,
    ctl00$ctl00$PageContent$PageContent$middDirectoryForm$txtSamaccountname: email,
    ctl00$ctl00$PageContent$PageContent$middDirectoryForm$btnSearch: "Search",
   */