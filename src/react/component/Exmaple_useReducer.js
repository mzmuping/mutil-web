import React, { useContext } from 'react';
import * as Types from '../reducer/types';
import * as Action from '../reducer/createAction';
export default () => {
  const cxt = useContext(Types.Appcontext);
  const {
    exmapleState: { count, isLogin },
    dispatch,
  } = cxt;
  const addCount = () => {
    dispatch(Action.onChangeCount(count));
  };
  const login = () => {
    dispatch(Action.login());
  };
  const logout = () => {
    dispatch(Action.logout());
  };
  return (
    <div>
      count:{count}
      <p>登录：{isLogin + ''}</p>
      <button onClick={addCount}>点击count+1</button>
      <button onClick={login}>登录</button>
      <button onClick={logout}>退出</button>
    </div>
  );
};
