import fetch from "node-fetch";
import { parse } from "node-html-parser";
import Person from "./person.js";
import { URLSearchParams } from "url";
import { SEARCH_URL } from "./utils.js";
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
        const emailAccountName = email.split("@")[0];
        const urlEncoded = new URLSearchParams();
        urlEncoded.append("Samaccountname", emailAccountName);
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Cookie: "ASP.NET_SessionId=orauz5z5ytfp3ebtz0r3eehv",
            }
        };
        const res = await fetch(`${SEARCH_URL}?${urlEncoded.toString()}`, requestOptions);
        const text = await res.text();
        const root = parse(text);
        const id = root
            .querySelector(".accordion-item__content")
            .getAttribute("id")
            .split("midd-accordion-content-")[1];
        return id;
    }
}
