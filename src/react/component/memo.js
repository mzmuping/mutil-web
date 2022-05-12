import React, { useEffect, useState, useContext } from 'react';
import { Appcontext } from '../reducer/types';

import usePrevious from '../hooks/usePrevious';
import useInterval from '../hooks/useInterval';
import message from './message';
// 未使用 memo：
// const List = ({ dataList }) => {
//   console.log('List 渲染');
//   return (
//     <div>
//       {' '}
//       {dataList.map((item) => (
//         <h2 key={item.id}> {item.title} </h2>
//       ))}{' '}
//     </div>
//   );
// };
// 使用 memo：
const List = React.memo(({ dataList }) => {
  console.log('List 渲染');
  return (
    <div>
      {' '}
      {dataList.map((item) => (
        <h2 key={item.id}> {item.title} </h2>
      ))}{' '}
    </div>
  );
});

export default () => {
  const [count, setCount] = useState(0);
  const [dataList, setDataList] = useState([]);
  const [style] = useState({
    color: '#fff',
  });
  const [interval, setInterval] = useState(1000);
  const cxt = useContext(Appcontext);
  const { count: globalCount } = cxt.exmapleState;
  const preCount = usePrevious(count);
  useInterval(() => {
    setCount(count + 1);
  }, interval);
  useEffect(() => {
    const list = [
      { title: 'React 性能优化', id: 1 },
      { title: 'Node.js 性能优化', id: 2 },
    ];
    setDataList(list);
  }, []);
  return (
    <div>
      <p>
        {' '}
        current :{count} --- preCount :{preCount} --- globalCount:{globalCount}
      </p>
      <button
        type="button"
        onClick={() => {
          console.log(count);
          setCount((c) => c + 1);
          console.log(count);
          setCount((c) => c + 1);
          console.log(count);
          setCount((c) => c + 1);
          console.log(count);
        }}
      >
        count: {count}{' '}
      </button>
      <button
        onClick={() => setInterval((t) => (t ? t + 1000 : 1000))}
        style={{ marginRight: 8 }}
      >
        interval + 1000
      </button>
      <button
        onClick={() => {
          message.info('messege===');
        }}
      >
        messege
      </button>
      <List dataList={dataList} style={style} />{' '}
    </div>
  );
};
