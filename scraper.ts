import fetch from 'node-fetch';
import { parse } from 'node-html-parser';

const DIRECTORY_URL = "https://directory.middlebury.edu/";
const SEARCH_URL = "https://directory.middlebury.edu/default.aspx";
const PERSON_URL = "https://directory.middlebury.edu/GetRecord.aspx";


export class Scraper {
  public async getPersonById(id: string): Promise<Person> {
    const res = await fetch(PERSON_URL + "?webid=" + id);
    const html = await res.text();
    const root = parse(html);

    const type = root.querySelector(
      "#rptProperties_ctl01_lblPropertyValue"
    ).text;
  }

  public async getPersonByEmail(email: string): Promise<Person> {
    const res = await fetch(PERSON_URL + "?webid=" + id);
    const html = await res.text();
    const root = parse(html);


    const person = new Person(root);
    const type = root.querySelector(
      "#rptProperties_ctl01_lblPropertyValue"
    ).text;
  }
}


