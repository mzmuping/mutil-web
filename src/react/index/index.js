import React, { createContext, useState, useReducer } from 'react';
import { createRoot } from 'react-dom/client';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { Appcontext } from '../reducer/types';
import Memo from '../component/memo';
import ExmapleUseReducer from '../component/Exmaple_useReducer';
import { user, counter, reducer } from '../reducer';

const App = () => {
  const initalState = { ...user, ...counter };
  const [exmapleState, setExmapleState] = useReducer(reducer, initalState);
  const [value, setValue] = useState('');
  console.log('app====');
  return (
    <Appcontext.Provider value={{ exmapleState, dispatch: setExmapleState }}>
      <Memo />
      <ExmapleUseReducer />
      <ReactQuill theme="snow" value={value} onChange={setValue} />
    </Appcontext.Provider>
  );
};

const domContainer = document.querySelector('#root');
const root = createRoot(domContainer);
root.render(<App />);
