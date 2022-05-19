import Form from './components/Form';
import Layout from './components/layout/Layout';
import Card from './components/layout/Card';
import classes from './App.module.css';
import { useState } from 'react';

function App() {
  const [preview, setPreview] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const previewHandler = (prev) => {
    setPreview(prev);
    console.log(prev);
  };

  const changeOpenHandler = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <Layout>
      <Card>
        <Form preview={previewHandler} isOpen={changeOpenHandler} />
      </Card>
      {preview && isOpen && (
        <Card>
          <div
            className={classes.preview}
            dangerouslySetInnerHTML={{ __html: preview }}
          ></div>
        </Card>
      )}
    </Layout>
  );
}

export default App;
