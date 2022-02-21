import {test} from 'uvu';
import * as assert from 'uvu/assert';
import { Scraper } from "../lib/scraper.js";

test("Student scrape", async () => {
  const S = new Scraper("nsliter@middlebury.edu");
  await S.init();

  assert.is(S.person.lastName, "Sliter");
  assert.is(S.person.firstName, "Nicholas Andrew Dollman");
  assert.is(S.person.id, "26A0780B00340F2FBDC28578D24F3AA5");
  assert.is(S.person.gradYear, "2023");
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


test.run();