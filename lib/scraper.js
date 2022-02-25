import fetch from "node-fetch";
import { parse } from "node-html-parser";
import Person from "./person.js";
import { viewstate, eventvalidation } from "./constants.js";
export const DIRECTORY_URL = "https://directory.middlebury.edu/";
export const SEARCH_URL = "https://directory.middlebury.edu/default.aspx";
export const PERSON_URL = "https://directory.middlebury.edu/GetRecord.aspx";
export class Scraper {
    email;
    person;
    id;
    constructor(email = null, id = null) {
        this.email = email ?? null;
        this.id = id ?? null;
    }
    async init() {
        if (!this.id) {
            this.id = await this.getIDByEmail(this.email);
        }
        this.person = new Person(this.id);
        await this.person.init();
    }
    async getIDByEmail(email) {
        const urlEncoded = new URLSearchParams();
        urlEncoded.append("__VIEWSTATE", viewstate);
        urlEncoded.append("__EVENTVALIDATION", eventvalidation);
        urlEncoded.append("ctl00$ctl00$PageContent$PageContent$middDirectoryForm$txtSamaccountname", email);
        urlEncoded.append("ctl00$ctl00$PageContent$PageContent$middDirectoryForm$btnSearch", "Search");
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Cookie: "ASP.NET_SessionId=orauz5z5ytfp3ebtz0r3eehv",
            },
            body: urlEncoded,
        };
        const res = await fetch("https://directory.middlebury.edu/", requestOptions);
        const text = await res.text();
        const root = parse(text);
        const link = root.querySelector("#ctl00_ctl00_PageContent_PageContent_middDirectoryForm_lstResults_ctl02_lnkName").attributes.href;
        return link.split("#")[1];
    }
}
