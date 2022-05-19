import chromium from 'chrome-aws-lambda';

module.exports = async function handler(req, res) {
  const data = req.body;

  const browser = await chromium.puppeteer.launch({
    args: [...chromium.args, '--hide-scrollbars', '--disable-web-security'],
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: true,
    ignoreHTTPSErrors: true,
  });

  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 3,
  });

  await page.setContent(data);

  const element = await page.$('.container');
  const screen = await element.screenshot();

  res.writeHead(200, { 'Content-Type': 'image/jpeg' });
  res.end(screen);
};
