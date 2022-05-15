import { generateCss } from './generateCss';
import { generateHtml } from './generateHtml';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytesResumable } from 'firebase/storage';
const fs = require('fs');
const puppeteer = require('puppeteer');

const firebaseConfig = {
  apiKey: 'AIzaSyB0WKjNSk_ej-kKe55r_iXywC0Re1X3Gvk',
  authDomain: 'diagrammi-666da.firebaseapp.com',
  projectId: 'diagrammi-666da',
  storageBucket: 'diagrammi-666da.appspot.com',
  messagingSenderId: '17842687905',
  appId: '1:17842687905:web:734008fbed42facb2245e0',
  measurementId: 'G-EFM3C3133F',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

module.exports = async function handler(req, res) {
  const data = req.body;

  const css = generateCss(data);
  const html = generateHtml(data, css);

  await fs.writeFile(
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
  const screen = await element.screenshot();

  const storageRef = ref(storage, '/diagram');
  uploadBytesResumable(storageRef, screen);

  res.send('url');
};
