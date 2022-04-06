import { useState, useRef } from 'react';
import classes from './Form.module.css';
import Bargraphs from './sub-forms/Bargraphs';
import { generateHtml } from '../helper/generateHtml';
import { generateCss } from '../helper/generateCss';
import { sendData } from '../helper/sendData';

const Form = () => {
  const typeDiag = useRef();
  const [selectedDiag, setSelectedDiag] = useState('');
  const [url, setUrl] = useState(null);

  const diagramChangeHandler = () => {
    setSelectedDiag(typeDiag.current.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = {
      diagramTitle: e.target.titlediagram.value,
      numberOfSection: e.target.selectsection.value,
      numberOfBlocks: e.target.blockssection.value,
      grid: e.target.grid.checked,
    };

    data.legend = {
      legend: e.target.legend.checked,
    };

    for (let i = 1; i <= e.target.colorPicker.length; i++) {
      data.legend[`color-${i}`] = e.target.colorPicker[i - 1].value;
      data.legend[`block-${i}-name`] =
        e.target.colorPicker[i - 1].parentElement.lastChild.value;
    }

    for (let i = 1; i <= data.numberOfSection; i++) {
      data[`section-${String(i)}`] = {};
      data[`section-${String(i)}`].title = e.target.sectitle[i - 1].value;
      data[`section-${String(i)}`].blocks = [];
      for (let j = 1; j <= data.numberOfBlocks; j++) {
        data[`section-${String(i)}`].blocks.push(
          e.target.sectitle[i - 1].parentElement.parentElement.children[j]
            .lastChild.value
        );
      }
    }

    const html = generateHtml(data);
    const css = generateCss(data);
    const generatedCode = {
      html,
      css,
    };

    const url = await sendData(JSON.stringify(generatedCode));
    setUrl(url);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div>
        <label htmlFor="select-diagram">Select diagram: </label>
        <select
          className={classes.select}
          ref={typeDiag}
          onChange={diagramChangeHandler}
          name="select-diagram"
          id="select-diagram"
        >
          <option defaultValue hidden></option>
          <option value="bargraphs">Bargraphs</option>
          <option value="/">Work in Progress</option>
        </select>
      </div>

      {selectedDiag === 'bargraphs' && <Bargraphs />}

      {url && (
        <button>
          <a href={url} download rel="noopener noreferrer" target="_blank">
            Download
          </a>
        </button>
      )}
    </form>
  );
};

export default Form;
