import { useEffect } from 'react';

const useClickOutside = (state, setState, ref) => {

  useEffect(() => {
    if (!state) return;
    function handleClick(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setState(false);
      }
    }
    globalThis.addEventListener('click', handleClick);
    // clean up
    return () => globalThis.removeEventListener('click', handleClick);
  }, [state, setState, ref]);
}

export default useClickOutside;