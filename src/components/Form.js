import { useState, useRef } from 'react';
import classes from './Form.module.css';
import Bargraphs from './sub-forms/Bargraphs';
import { generateHtml } from '../utils/generateHtml';
import { generateCss } from '../utils/generateCss';
import ReCAPTCHA from 'react-google-recaptcha';
import { screen } from 'screen-p';

const Form = (props) => {
  const typeDiag = useRef();
  const [selectedDiag, setSelectedDiag] = useState('');
  const [token, setToken] = useState();
  const [download, setDownload] = useState();

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

    const css = generateCss(data);
    const htmlString = generateHtml(data, css);

    const serverData = await screen(htmlString);

    const objectURL = URL.createObjectURL(serverData);

    if (token) {
      props.preview(htmlString);
      setDownload(objectURL);
    }
  };

  function onChange(value) {
    setToken(value);
  }

  const downloadButton = download ? (
    <button className={classes.buttondwn}>
      <a href={download} download rel="noopener noreferrer">
        Download
      </a>
    </button>
  ) : (
    <button className={classes.buttonDis} disabled>
      <span>Download</span>
    </button>
  );

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
          required
        >
          <option defaultValue hidden></option>
          <option value="bargraphs">Bargraphs</option>
          <option value="/">Work in Progress</option>
        </select>
      </div>

      {selectedDiag === 'bargraphs' && <Bargraphs />}

      <ReCAPTCHA
        sitekey={process.env.REACT_APP_CLIENT_CAPTCHA}
        onChange={onChange}
        className={classes.recaptcha}
      />

      <div className={classes.buttons}>
        <button className={classes.button} type="sybmit">
          Submit
        </button>

        <button type="button" className={classes.button} onClick={props.isOpen}>
          Preview
        </button>

        {downloadButton}
      </div>
    </form>
  );
};

export default Form;
