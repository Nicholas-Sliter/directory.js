# directory.js
JavasScript / TypeScript API for the Middlebury Directory at directory.middlebury.edu/default.aspx.
Node package at https://www.npmjs.com/package/directory.js.

Use it like this
```js

import { Scraper } from 'directory.js';

const middleburyEmail = "example@middlebury.edu";
const S = new Scraper(middleburyEmail);

async () => {
  await S.init();
  console.log(S.person);

}






```

