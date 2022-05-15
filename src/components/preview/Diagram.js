import './Diagram.css';

const Diagram = (props) => {
  return <div dangerouslySetInnerHTML={{ __html: props.html }}></div>;
};

export default Diagram;
