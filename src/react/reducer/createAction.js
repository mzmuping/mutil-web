import * as Types from './types';
export const onChangeCount = (count) => ({
    type: Types.EXMAPLE_TEST,
    payload: count + 1,
});

export const isLogin = (payload) => ({
    type: Types.ISLOGIN,
    payload,
});

export const login = () => {
    return isLogin(true);
};

export const logout = () => {
    return isLogin(false);
};

export const fetchData = (payload) => ({
    type: Types.GETDATA,
    payload,
});
