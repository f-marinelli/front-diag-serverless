// const fetch = require('node-fetch');

// export default async function handler(req, res) {
//   const data = await fetch('https://www.google.com/');

//   const url = await data.json();
//   console.log(url);
// }
//

import fetch from 'node-fetch';

export default async function handler(request, response) {
  const res = await fetch('https://www.google.com');

  const data = await res.json();
  return response.status(200).json({ data });
}
