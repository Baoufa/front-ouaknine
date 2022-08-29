import { useEffect, useState } from 'react';
import useEventListener from './useEventListener';

const useOffset = (state, setState, ref, offset = 1, m1 = 1, m2 = 1) => {
  const [scrollY, setScrollY] = useState({
    scrollY: null,
    innerHeight: null,
  });

  useEffect(() => {
    const scaleY = ref.current.getBoundingClientRect().top + offset;
    const windowY = scrollY.innerHeight;
    const x = (scaleY / windowY) * m1;
    const offsetScale = x
     
    if (offsetScale >= 0 && offsetScale <= 1) {
      setState(offsetScale);
    }
    if (offsetScale < 0) {
      setState(0);
    }
    if (offsetScale > 1) {
      setState(1);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, scrollY.innerHeight, scrollY.scrollY]);

  useEventListener('scroll', e =>
    setScrollY(state => ({
      ...state,
      scrollY: globalThis.scrollY,
      innerHeight: globalThis.innerHeight,
    }))
  );
};

export default useOffset;
