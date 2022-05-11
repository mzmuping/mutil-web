import React, { createContext, useState, useReducer } from 'react';
import { createRoot } from 'react-dom/client';
import { Appcontext } from '../reducer/types';
import Memo from '../component/memo';
import ExmapleUseReducer from '../component/Exmaple_useReducer';
import { user, counter, reducer } from '../reducer';

const App = () => {
    const initalState = { ...user, ...counter };
    const [exmapleState, setExmapleState] = useReducer(reducer, initalState);

    return (
        <Appcontext.Provider value={{ exmapleState, dispatch: setExmapleState }}>
            <Memo />
            <ExmapleUseReducer />
        </Appcontext.Provider>
    );
};

const domContainer = document.querySelector('#root');
const root = createRoot(domContainer);
root.render(<App />);
