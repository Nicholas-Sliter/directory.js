import { PERSON_URL } from "./utils.js";
import { parse } from "node-html-parser";
import fetch from "node-fetch";
export default class Person {
    id;
    firstName;
    lastName;
    email;
    type;
    gradYear;
    department;
    constructor(id) {
        this.id = id;
    }
    async init() {
        await this.__getPersonDetailsById(this.id);
    }
    async __getPersonDetailsById(id) {
        const res = await fetch(`${PERSON_URL}?webid=${id}`);
        const html = await res.text();
        const root = parse(html);
        const name = root
            .querySelector("#rptProperties_ctl00_lblPropertyValue")
            .text.split(", ");
        this.firstName = name[1];
        this.lastName = name[0];
        this.email = root.querySelector("#rptProperties_ctl02_lblPropertyValue").text;
        this.type = root.querySelector("#rptProperties_ctl01_lblPropertyValue").text;
        if (this.type === "Student") {
            this.gradYear = root.querySelector("#rptProperties_ctl06_lblPropertyValue")?.text ?? undefined;
        }
        if (this.type === "Faculty") {
            let deptNode;
            for (let i = 0; i < root.querySelectorAll("td").length / 2; i++) {
                //convert i to string and pad with 0 if size 1
                const iStr = i.toString().padStart(2, "0");
                if (root.querySelector(`#rptProperties_ctl${iStr}_lblPropertyName`).text.includes("Department")) {
                    deptNode = root.querySelector(`#rptProperties_ctl${iStr}_lblPropertyValue`);
                    break;
                }
            }
            this.department = deptNode?.text ?? "Unknown";
        }
    }
}
