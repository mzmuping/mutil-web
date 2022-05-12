import { useEffect, useRef } from 'react';

const usePrevious = (value) => {
  let ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
export default usePrevious;
