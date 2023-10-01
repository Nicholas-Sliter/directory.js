import { PERSON_URL, getPropertyValueByName } from "./utils.js";
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
        const res = await fetch(`${PERSON_URL}?MiddleburyCollegeUID=${id}`);
        const html = await res.text();
        const root = parse(html);
        const personNode = root
            .getElementById(`midd-accordion-content-${id}`)
            .querySelector(".media-object__body");
        if (!personNode) {
            throw new Error("Person not found");
        }
        // const name = getPropertyValueByName(personNode, "Name")?.split(", ") ?? ["", ""];
        const name = personNode.querySelector("h3")?.text?.split(", ") ?? ["", ""];
        this.firstName = name[1];
        this.lastName = name[0];
        this.email = getPropertyValueByName(personNode, "E-mail");
        this.type = getPropertyValueByName(personNode, "Type");
        if (this.type !== "Student") {
            this.type = "Faculty";
        }
        if (this.type === "Student") {
            this.gradYear = getPropertyValueByName(personNode, "Year of Graduation") ?? undefined;
        }
        if (this.type !== "Student") {
            this.department = getPropertyValueByName(personNode, "Department");
        }
    }
}
