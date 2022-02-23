import { PERSON_URL } from "./utils.js";
import { parse } from "node-html-parser";
import fetch from "node-fetch";

export default class Person {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  type: string;
  gradYear?: string;
  department?: string;

  constructor(id) {
    this.id = id;
  }
  async init(){
    await this.__getPersonDetailsById(this.id);
  }

  private async __getPersonDetailsById(id: string) {
    const res = await fetch(`${PERSON_URL}?webid=${id}`);
    const html = await res.text();
    const root = parse(html);
    const name = root
      .querySelector("#rptProperties_ctl00_lblPropertyValue")
      .text.split(", ");
    this.firstName = name[1];
    this.lastName = name[0];
    this.email = root.querySelector(
      "#rptProperties_ctl02_lblPropertyValue"
    ).text;
    this.type = root.querySelector("#rptProperties_ctl01_lblPropertyValue").text;

    if (this.type === "Student") {
      this.gradYear = root.querySelector(
        "#rptProperties_ctl06_lblPropertyValue"
      )?.text ?? undefined;
    }

    if (this.type === "Faculty") {
      this.department = root.querySelector(
        "#rptProperties_ctl06_lblPropertyValue"
      ).text;
    }
  }
}
