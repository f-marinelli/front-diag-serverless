import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytesResumable } from 'firebase/storage';
// const fs = require('fs');
import chromium from 'chrome-aws-lambda';
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

const generateGrid = () => {
  const grid = `    <div class="griglia">
  <div class="numeri-griglia">
    <div>90     </div>
    <div>80     </div>
    <div>70     </div>
    <div>60     </div>
    <div>50     </div>
    <div>40     </div>
    <div>30     </div>
    <div>20     </div>
    <div>10     </div>
  </div>
  <div class="righe-griglia">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</div>
`;
  return grid;
};

const generateLegend = (data) => {
  const genBlock = (data) => {
    let output = ``;
    for (let i = 1; i <= data.numberOfBlocks; i++) {
      const block = data.legend[`block-${i}-name`];
      output += `
      <div class="blocco-legenda">
      <div class="square" id="sq${i}"></div>
      <p>${block}</p>
    </div>
  
      `;
    }
    return output;
  };

  const legend = `
  <div class="legenda">
  ${genBlock(data)}
</div>

  `;

  return legend;
};

const generateBlocks = (data, color) => {
  let output = ``;
  for (let j = 0; j < data.blocks.length; j++) {
    const col = color.legend[`color-${j + 1}`];
    const noCol = col.slice(1);
    const classe = `sezione-${data.title.replace(/ /g, '_')}-${
      data.blocks[j]
    }-${noCol}`;
    const p = data.blocks[j] < 90 ? `<p>${data.blocks[j]}%</p>` : ``;
    output += `
    <div class="div-perc">
      ${p}
      <div class=${classe}></div>
    </div>
      `;
  }

  return output;
};

const generateSections = (data) => {
  let output = ``;
  for (let i = 1; i <= data.numberOfSection; i++) {
    let section = data[`section-${i}`];
    output += `<div class="sezione">
      ${generateBlocks(section, data)}
    </div>
`;
  }
  return output;
};

const generateTitles = (data) => {
  let output = ``;

  for (let i = 1; i <= data.numberOfSection; i++) {
    let title = data[`section-${i}`].title;
    output += `
    <h2>${title}</h2>
`;
  }

  return output;
};

export const generateHtml = (data, css) => {
  const html = `
  <head>
    <style>
      ${css}
    </style>
  </head>
  <body>
    <div class="container">
      <h1>${data.diagramTitle}</h1>
      <div class="grafico">
        ${data.grid ? generateGrid() : ``}
        ${generateSections(data)}
        <div class="titolo-sezione">
          ${generateTitles(data)}
        </div>
      </div>
      ${data.legend.legend ? generateLegend(data) : ``}
    </div>
  </body>
`;

  return html;
};

const generateLegendCss = (data) => {
  let output = `.legenda {
    width: fit-content;
    height: fit-content;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border: 2px solid rgb(0, 0, 0);
    margin-bottom: 2rem;
    padding: 3rem;
    gap: 3rem;
  }
  
  .blocco-legenda {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .square {
    height: 10px;
    width: 10px;
  }
  `;

  for (let i = 1; i <= data.numberOfBlocks; i++) {
    const color = data.legend[`color-${i}`];
    output += `
      #sq${i} {
        background-color: ${color};
      }
    `;
  }

  return output;
};

const generateGridCss = () => {
  const output = `.griglia {
    position: absolute;
    width: 104%;
    height: 100%;
    left: -4%;
    display: flex;
    justify-content: flex-end;
  }
  
  .numeri-griglia {
    width: 4%;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-end;
    margin-top: 9px;
  }
  
  .numeri-griglia div {
    font-size: 0.5rem;
    padding-right: 0.5rem;
  }
  
  .righe-griglia {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  
  .righe-griglia div {
    width: 100%;
    height: 19.5px;
    border-bottom: 0.5px solid lightgray;
  }
  
  .righe-griglia div:last-child {
    border-bottom: none;
  }
  
  `;

  return output;
};

const generateBlocksCss = (data) => {
  let outupt = ``;
  for (let i = 1; i <= data.numberOfSection; i++) {
    const section = data[`section-${i}`];
    for (let j = 1; j <= data.numberOfBlocks; j++) {
      const color = data.legend[`color-${j}`];
      const noCol = color.slice(1);
      const classe = `.sezione-${section.title.replace(/ /g, '_')}-${
        section.blocks[j - 1]
      }-${noCol}`;

      outupt += `
      ${classe} {
        width: 2rem;
        z-index: 1;
        box-shadow: inset 0px 0px 0px 1px rgb(0, 0, 0);
        height: ${Number(section.blocks[j - 1])}%;
        background-color: ${color};
      }
      `;
    }
  }

  return outupt;
};

export const generateCss = (data) => {
  const css = `* {
    margin: 0;
    padding: 0;
  }
  
  body {
    width: 100vw;
    font-family: 'Times New Roman', Times, serif;
  }
  
  h1 {
    font-size: 1rem;
  }
  /*  */
  
  .container {
    width: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 2rem 2rem;
    gap: 1rem;
    background-color: white;
  }
  
  .grafico {
    width: fit-content;
    padding: 0 2rem;
    height: 200px;
    display: flex;
    gap: 3rem;
    border: 2px solid rgb(0, 0, 0);
    position: relative;
    margin-bottom: 5rem;
  }
  
  .titolo-sezione {
    position: absolute;
    display: flex;
    justify-content: space-around;
    width: 100%;
    bottom: -20%;
    left: 0;
  }
  
  .titolo-sezione h2 {
    font-size: 1rem;
  }
  
  .sezione {
    height: 100%;
    width: fit-content;
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: flex-end;
  }
  
  .div-perc {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
  }
  
  .div-perc p {
    font-size: 0.8rem;
    padding-top: 0.1rem;
    z-index: 1;
  }

  ${generateBlocksCss(data)}
  ${data.grid ? generateGridCss() : ``}
  ${data.legend.legend ? generateLegendCss(data) : ``}


  `;

  return css;
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

module.exports = async function handler(req, res) {
  const data = req.body;

  const css = generateCss(data);
  const html = generateHtml(data, css);

  // await fs.writeFile(
  //   `${__dirname}/../src/components/preview/Diagram.css`,
  //   css,
  //   (err) => {
  //     if (err) throw err;
  //   }
  // );
  // const browser = await puppeteer.launch({ headless: true });
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

  const storageRef = ref(storage, '/diagram');
  uploadBytesResumable(storageRef, screen);

  res.send('url');
};
