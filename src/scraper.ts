import fetch, { RequestInit } from "node-fetch";
import { parse } from "node-html-parser";
import Person from "./person.js";
import { URLSearchParams } from "url";
import { SEARCH_URL, paramMapping } from "./utils.js";
import { useragent } from "./constants.js";
// import { viewstate, eventvalidation } from "./constants.js";

export class Scraper {
  email?: string;
  person: Person;
  id?: string;
  page?: string;
  firstName?: string;
  lastName?: string;

  constructor(email: string = null, id: string = null, firstName: string = null, lastName: string = null) {
    this.email = email ?? null;
    this.id = id ?? null;
    this.firstName = firstName ?? null;
    this.lastName = lastName ?? null;
  }

  public async init(): Promise<void> {

    if ((this.firstName || this.lastName) && this.id) {
      const { id, text } = await this.getPageByNameAndId(this.firstName, this.lastName, this.id);
      this.id = id;
      this.page = text ?? null;
    }
    else if (this.email) {
      const { id, text } = await this.getIDByEmail(this.email);
      this.id = id;
      this.page = text ?? null;
    }
    this.person = new Person(this.id, this.page);
    await this.person.init();

  }

  // private async getIDByEmail(email: string): Promise<string> {

  //   const emailAccountName = email.split("@")[0];
  //   const urlEncoded = new URLSearchParams();


  //   urlEncoded.append(
  //     "Samaccountname",
  //     emailAccountName
  //   );

  //   const requestOptions = {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded",
  //       Cookie: "ASP.NET_SessionId=orauz5z5ytfp3ebtz0r3eehv",
  //     }
  //   };


  //   const res = await fetch(
  //     `${SEARCH_URL}?${urlEncoded.toString()}`,
  //     requestOptions
  //   );
  //   const text = await res.text();
  //   const root = parse(text);
  //   const id = root
  //     .querySelector(".accordion-item__content")
  //     .getAttribute("id")
  //     .split("midd-accordion-content-")[1];

  //   return id;
  // }


  private async getApsxConstants(): Promise<{
    cookie: string,
    viewstate: string,
    eventvalidation: string,
    viewstategenerator: string
  }> {

    const res = await fetch(
      "https://directory.middlebury.edu/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": useragent
        }
      }
    );

    const cookie = res.headers.get("set-cookie").split(";")[0];

    const text = await res.text();
    const root = parse(text);
    const viewstate = root.querySelector(
      "#__VIEWSTATE"
    ).attributes.value;
    const eventvalidation = root.querySelector(
      "#__EVENTVALIDATION"
    ).attributes.value;
    const viewstategenerator = root.querySelector(
      "#__VIEWSTATEGENERATOR"
    ).attributes.value;

    return {
      cookie,
      viewstate,
      eventvalidation,
      viewstategenerator
    }

  }


  private async getPageByNameAndId(firstName: string, lastName: string, id: string): Promise<{
    id: string,
    text: string
  }> {
    const urlEncoded = new URLSearchParams();

    const { cookie, viewstate, eventvalidation, viewstategenerator } = await this.getApsxConstants();

    urlEncoded.append("__EVENTTARGET", "");
    urlEncoded.append("__EVENTARGUMENT", "");
    urlEncoded.append("__VIEWSTATE", viewstate);
    urlEncoded.append("__VIEWSTATEGENERATOR", viewstategenerator);
    urlEncoded.append("__EVENTVALIDATION", eventvalidation);

    urlEncoded.append(
      "ctl00$ctl00$PageContent$PageContent$middDirectoryForm$txtSimpleSearch",
      ""
    );

    if (lastName) {
      urlEncoded.append(
        paramMapping.lastName,
        lastName
      );
    }

    if (firstName) {
      urlEncoded.append(
        paramMapping.firstName,
        firstName
      );
    }

    urlEncoded.append(
      "ctl00$ctl00$PageContent$PageContent$middDirectoryForm$btnSearch",
      "Search"
    );

    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: cookie,
        Origin: "https://directory.middlebury.edu",
        Referer: "https://directory.middlebury.edu/",
        Dnt: "1",
        "Sec-Fetch-Dest": "document",
        "Cache-Control": "max-age=0",
        "User-Agent": useragent
      },
      body: urlEncoded,
    };

    const res = await fetch(
      "https://directory.middlebury.edu/",
      requestOptions
    );

    const text = await res.text();

    return { id, text };
  }


  private async getIDByEmail(email: string): Promise<{ id: string, text: string }> {

    const urlEncoded = new URLSearchParams();

    const { cookie, viewstate, eventvalidation, viewstategenerator } = await this.getApsxConstants();

    urlEncoded.append("__EVENTTARGET", "");
    urlEncoded.append("__EVENTARGUMENT", "");
    urlEncoded.append("__VIEWSTATE", viewstate);
    urlEncoded.append("__VIEWSTATEGENERATOR", viewstategenerator);
    urlEncoded.append("__EVENTVALIDATION", eventvalidation);

    urlEncoded.append(
      "ctl00$ctl00$PageContent$PageContent$middDirectoryForm$txtSimpleSearch",
      ""
    );

    urlEncoded.append(
      "ctl00$ctl00$PageContent$PageContent$middDirectoryForm$txtSamaccountname",
      email
    );
    urlEncoded.append(
      "ctl00$ctl00$PageContent$PageContent$middDirectoryForm$btnSearch",
      "Search"
    );

    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: cookie,
        Origin: "https://directory.middlebury.edu",
        Referer: "https://directory.middlebury.edu/",
        Dnt: "1",
        "Sec-Fetch-Dest": "document",
        "Cache-Control": "max-age=0",
        "User-Agent": useragent
      },
      body: urlEncoded,
    };

    const res = await fetch(
      "https://directory.middlebury.edu/",
      requestOptions
    );

    const text = await res.text();
    const root = parse(text);
    const id = root
      .querySelector(".accordion-item__content")
      .getAttribute("id")
      .split("midd-accordion-content-")[1];

    return { id, text };

  }



}
