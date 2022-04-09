import { Fragment, useState, useRef } from 'react';
import classes from './Bargraphs.module.css';

const Bargraphs = () => {
  const [sections, setSections] = useState(0);
  const [blocks, setBlocks] = useState(0);
  const nSection = useRef();
  const nBlocks = useRef();

  const changeSectionsHandler = () => {
    setSections(nSection.current.value);
  };

  const changeBlocksHandler = () => {
    setBlocks(nBlocks.current.value);
  };

  const dataLegend = [...Array(Number(blocks)).keys()].map((block) => (
    <div key={block}>
      <label htmlFor={`color-${block + 1}`}>Color block n{block + 1}: </label>
      <input type="color" name={`color-${block + 1}`} id="colorPicker" />
      <label htmlFor={`name-${block + 1}`}> Name block: </label>
      <input type="text" name={`name-${block + 1}`} required maxlength="20" />
    </div>
  ));

  const numBlocks = [...Array(Number(blocks)).keys()].map((block, i) => (
    <div key={`block-${block + i}`}>
      <label key={`label-${block + i}`} htmlFor={`block-${block}`}>
        Height block {i + 1} (%)
      </label>
      <input
        key={block}
        type="number"
        name={`block`}
        id={`block-${block}`}
        min="0"
        max="100"
        required
      ></input>
    </div>
  ));

  const numSections = [...Array(Number(sections)).keys()].map((el, i) => (
    <div className={classes.section} key={el} id={`section-${el + i}`}>
      Section {el + 1}
      <div>
        <label htmlFor="sectitle">Section title: </label>
        <input type="text" id="sectitle" maxlength="20"></input>
      </div>
      {numBlocks}
    </div>
  ));

  return (
    <Fragment>
      <div id="sel-sect">
        <label htmlFor="selectsection">Numbers of sections: </label>
        <select
          className={classes.select}
          ref={nSection}
          onChange={changeSectionsHandler}
          name="selectsection"
          id="select-section"
          required
        >
          <option defaultValue hidden></option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <div id="sel-block">
        <label htmlFor="blockssection">Blocks for sections: </label>
        <select
          className={classes.select}
          ref={nBlocks}
          onChange={changeBlocksHandler}
          name="blockssection"
          id="blocks-section"
          required
        >
          <option defaultValue hidden></option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <div>
        <label htmlFor="titlediagram">Diagram Title:</label>
        <input
          type="text"
          id="title-diagram"
          name="titlediagram"
          maxlength="50"
        />
      </div>
      {dataLegend}
      {numSections}
      <div>
        <label htmlFor="grid">Grid:</label>
        <input type="checkbox" id="grid" name="grid" />
        <label htmlFor="legend">Legend:</label>
        <input type="checkbox" id="legend" name="legend" />
      </div>
      <button type="sybmit">Submit</button>
    </Fragment>
  );
};

export default Bargraphs;
