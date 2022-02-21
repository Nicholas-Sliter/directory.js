import { Scraper } from "./scraper.js";


const S = new Scraper("nsliter@middlebury.edu");
await S.init();
console.log(S);

const S1 = new Scraper("avaccari@middlebury.edu");
await S1.init();
console.log(S1);