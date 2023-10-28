import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { Scraper } from "../lib/scraper.js";

test("Student scrape", async () => {
  const S = new Scraper("aballo@middlebury.edu");
  await S.init();

  console.log(S.person);

  assert.is(S.person.lastName, "Ballo");
  assert.is(S.person.id, "A776C2DB5B8A4B2DAB111D73EC66DDCC");
  //Only valid when run on internal middlebury networks
  //assert.is(S.person.gradYear, "2023");
  assert.is(S.person.type, "Student");
  assert.is(S.person.department, undefined);
});


// test("Student scrape with ID", async () => {
//   const S = new Scraper("", "A776C2DB5B8A4B2DAB111D73EC66DDCC");
//   await S.init();

//   assert.is(S.person.lastName, "Ballo");
//   assert.is(S.person.id, "A776C2DB5B8A4B2DAB111D73EC66DDCC");
//   //Only valid when run on internal middlebury networks
//   //assert.is(S.person.gradYear, "2023");
//   assert.is(S.person.type, "Student");
//   assert.is(S.person.department, undefined);
// });

// test("Faculty scrape with ID", async () => {
//   const S = new Scraper("", "24D40C0872F9CE5ED2CDF6F2F9CB82EA");
//   await S.init();

//   assert.is(S.person.lastName, "Lyford");
//   assert.is(S.person.id, "24D40C0872F9CE5ED2CDF6F2F9CB82EA");
//   assert.is(S.person.type, "Faculty");
//   assert.is(S.person.department, "Mathematics");
// });

test("Faculty scrape", async () => {
  const S1 = new Scraper("avaccari@middlebury.edu");
  await S1.init();

  console.log(S1.person);

  assert.is(S1.person.lastName, "Vaccari");
  assert.is(S1.person.firstName, "Andrea");
  assert.is(S1.person.id, "4347EFF33F703A17CBF34CE12E14464A");
  assert.is(S1.person.email, "avaccari@middlebury.edu")
  assert.is(S1.person.gradYear, undefined);
  assert.is(S1.person.type, "Faculty");
  assert.is(S1.person.department, "Computer Science");
});

test("Alternate faculty scrape", async () => {
  const S1 = new Scraper("stanger@middlebury.edu");
  await S1.init();

  console.log(S1.person);

  assert.is(S1.person.lastName, "Stanger");
  assert.is(S1.person.firstName, "Allison");
  assert.is(S1.person.id, "E4D014379D428C941E40E8571920E70B");
  assert.is(S1.person.email, "stanger@middlebury.edu");
  assert.is(S1.person.gradYear, undefined);
  assert.is(S1.person.type, "Faculty");
  assert.is(S1.person.department, "Political Science");

});

test("Faculty scrape by name", async () => {
  const S1 = new Scraper(null, "4347EFF33F703A17CBF34CE12E14464A", "Andrea", "Vaccari");
  await S1.init();

  console.log(S1.person);

  assert.is(S1.person.lastName, "Vaccari");
  assert.is(S1.person.firstName, "Andrea");
  assert.is(S1.person.id, "4347EFF33F703A17CBF34CE12E14464A");
  assert.is(S1.person.email, "avaccari@middlebury.edu")
  assert.is(S1.person.gradYear, undefined);
  assert.is(S1.person.type, "Faculty");
  assert.is(S1.person.department, "Computer Science");
});




test.run();