import { generateCss } from './generateCss';
import { generateHtml } from './generateHtml';
const fs = require('fs');
const puppeteer = require('puppeteer');

module.exports = async function handler(req, res) {
  const data = req.body;

  const css = generateCss(data);
  const html = generateHtml(data, css);

  fs.writeFile(
    `${__dirname}/../src/components/preview/Diagram.css`,
    css,
    (err) => {
      if (err) throw err;
    }
  );

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 3,
  });
  await page.setContent(html);
  const element = await page.$('.container');
  await element.screenshot({
    path: `${__dirname}/../src/diagrama.jpeg`,
  });

  res.send('url');
};
