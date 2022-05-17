import chromium from 'chrome-aws-lambda';
import { generateCss } from './_generateCss';
import { generateHtml } from './_generateHtml';

module.exports = async function handler(req, res) {
  const data = req.body;

  const css = generateCss(data);
  const html = generateHtml(data, css);

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

  await page.setContent(html);

  const element = await page.$('.container');
  const screen = await element.screenshot();

  res.writeHead(200, { 'Content-Type': 'image/jpeg' });
  res.end(screen);
};
