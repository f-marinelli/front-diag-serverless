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

export const generateHtml = (data) => {
  const html = `
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
