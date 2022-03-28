import {test} from 'uvu';
import * as assert from 'uvu/assert';
import { Scraper } from "../lib/scraper.js";

test("Student scrape", async () => {
  const S = new Scraper("nsliter@middlebury.edu");
  await S.init();

  console.log(S.person);

  assert.is(S.person.lastName, "Sliter");
  assert.is(S.person.id, "26A0780B00340F2FBDC28578D24F3AA5");
  //Only valid when run on internal middlebury networks
  //assert.is(S.person.gradYear, "2023");
  assert.is(S.person.type, "Student");
  assert.is(S.person.department, undefined);
});


test("Student scrape with ID", async () => {
  const S = new Scraper("", "26A0780B00340F2FBDC28578D24F3AA5");
  await S.init();

  assert.is(S.person.lastName, "Sliter");
  assert.is(S.person.id, "26A0780B00340F2FBDC28578D24F3AA5");
  //Only valid when run on internal middlebury networks
  //assert.is(S.person.gradYear, "2023");
  assert.is(S.person.type, "Student");
  assert.is(S.person.department, undefined);
});

test("Faculty scrape", async () => {
  const S1 = new Scraper("avaccari@middlebury.edu");
  await S1.init();

  assert.is(S1.person.lastName, "Vaccari");
  assert.is(S1.person.firstName, "Andrea");
  assert.is(S1.person.id, "4347EFF33F703A17CBF34CE12E14464A");
  assert.is(S1.person.gradYear, undefined);
  assert.is(S1.person.type, "Faculty");
  assert.is(S1.person.department, "Computer Science");
});

test("Alternate faculty scrape", async () => {
  const S1 = new Scraper("stanger@middlebury.edu");
  await S1.init();

  assert.is(S1.person.lastName, "Stanger");
  assert.is(S1.person.firstName, "Allison");
  assert.is(S1.person.id, "E4D014379D428C941E40E8571920E70B");
  assert.is(S1.person.gradYear, undefined);
  assert.is(S1.person.type, "Faculty");
  assert.is(S1.person.department, "Political Science");

});


test.run();