import * as Types from './types';

export const counter = {
    count: 0,
    data: [],
};

export const user = {
    isLogin: false,
    dataArray: ['vue', 'react', 'node'],
};

export const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case Types.EXMAPLE_TEST:
            return {
                ...state,
                count: payload,
            };
        case Types.GETDATA:
            return {
                ...state,
                data: payload,
            };
        case Types.ISLOGIN:
            return {
                ...state,
                isLogin: payload,
            };
    }
};
