const https = require('https');

const options = {
  hostname: 'hcti.io',
  port: 443,
  path: '/v1/image',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      'Basic ' +
      new Buffer.from(
        'e64f69a6-3071-4383-9b9c-7bee3a4cfb3d' +
          ':' +
          'c5041e15-c746-4802-935f-4f7e2711ee65'
      ).toString('base64'),
  },
};

module.exports = async function handler(req, res) {
  const data = req.body;
  new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      res.on('data', (d) => {
        res['resUrl'] = JSON.parse(d);
      });
    });
    req.on('response', (res) => {
      resolve(res);
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(JSON.stringify(data));
    req.end();
  }).then((url) => res.send(url.resUrl.url));
};
