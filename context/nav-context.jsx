import { createContext, useState, useEffect } from 'react';
import useEventListener from '../hooks/useEventListener';
import useTimeout from '../hooks/useTimout';

export const NavContextSchema = createContext({
  isOn: null,
  toggleNav: () => {},
  removeNav: () => {},
});

function NavContext(props) {
  const [state, setState] = useState({
    isOn: null,
    toggleNav: () => {
      setState(prevState => ({...prevState, isOn : !prevState.isOn}));
    },
    removeNav: () => {
      setState(prevState => ({...prevState, isOn : false}));
    },
  });

  useEffect(() => {
    if (state.isOn) {
      document.body.classList.add('body-full');
    } 
    
    if(state.isOn === false){
      document.body.classList.remove('body-full');
    }
  }, [state.isOn]);

  const closeNav = (e) => {
    if(globalThis.innerWidth > 992) {
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
