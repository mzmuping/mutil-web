import React from 'react';
import * as ReactDOM from 'react-dom/client';
const Info = (props) => {
    return <div>{props.msg}</div>;
};
const Success = (props) => {
    return <div>{props.msg}</div>;
};

const createMessege = (msg, comp) => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const component = React.createElement(comp, {
        msg,
    });
    const root = ReactDOM.createRoot(el);
    root.render(component);
};

const message = {
    info: (msg) => {
        createMessege(msg, Info);
    },
    success: (msg) => {
        createMessege(msg, Success);
    },
};

export default message;
