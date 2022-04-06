const generateLegend = (data) => {
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

const generateGrid = () => {
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

const generateBlocks = (data) => {
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
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 2rem 2rem;
    gap: 1rem;
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

  ${generateBlocks(data)}
  ${data.grid ? generateGrid() : ``}
  ${data.legend.legend ? generateLegend(data) : ``}


  `;

  return css;
};
