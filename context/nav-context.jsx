import { createContext, useState, useEffect } from 'react';
import useEventListener from '../hooks/useEventListener';

export const NavContextSchema = createContext({
  isOn: null,
  toggleNav: () => {},
  removeNav: () => {},
});

function NavContext(props) {
  const [state, setState] = useState({
    isOn: null,
    toggleNav: () => {
      setState(prevState => ({ ...prevState, isOn: !prevState.isOn }));
    },
    removeNav: () => {
      setState(prevState => ({ ...prevState, isOn: false }));
    },
  });

  useEventListener('scroll', e => {
    if (state.isOn) {
      globalThis.scrollTo(0,0)
    }
  });
  useEventListener('touchstart', e => {
    if (state.isOn) {
      globalThis.scrollTo(0,0)
    }
  });

  useEffect(() => {
    if (state.isOn) {
      document.body.classList.add('body-full');
    }

    if (state.isOn === false) {
      document.body.classList.remove('body-full');
    }
  }, [state.isOn]);

  const closeNav = e => {
    if (globalThis.innerWidth > 992) {
      state.removeNav();
    }
  };
  useEventListener('resize', closeNav, globalThis);

  return (
    <NavContextSchema.Provider value={state}>
      {props.children}
    </NavContextSchema.Provider>
  );
}

export default NavContext;
