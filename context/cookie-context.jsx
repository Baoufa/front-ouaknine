import { createContext, useState, useEffect } from 'react';

export const CookieContextSchema = createContext({
  isAccepted: null,
  isRead: null,
  isShown: null,
  readCookie: () => {},
  acceptCookie: () => {},
  denyCookie: () => {},
  toggleCookie: () => {},
});

function CookieContext(props) {
  const [state, setState] = useState({
    isAccepted: null,
    isRead: false,
    doNotShow: false,
    readCookie: async () => {
      setState(prevState => ({ ...prevState, isRead: true }));
      const bol = localStorage.getItem('analytics');
      if (bol === 'true' || bol === 'false') {
        setState(prevState => ({
          ...prevState,
          isAccepted: bol,
          doNotShow: true,
        }));
      }
    },
    acceptCookie: () => {
      localStorage.setItem('analytics', true);
      setState(prevState => ({
        ...prevState,
        isAccepted: true,
        isRead: true,
        doNotShow: true,
      }));
    },
    denyCookie: () => {
      localStorage.setItem('analytics', false);
      setState(prevState => ({
        ...prevState,
        isAccepted: false,
        isRead: true,
        doNotShow: true,
      }));
    },
    toggleCookie: (bol) => {
      localStorage.setItem('analytics', !bol);
      setState(prevState => ({
        ...prevState,
        isAccepted: !bol,
        isRead: true,
        doNotShow: true,
      }));
    },
  });

  useEffect(() => {
    if (!state.isRead) {
      state.readCookie();
    }
  }, [state]);

  return (
    <CookieContextSchema.Provider value={state}>
      {props.children}
    </CookieContextSchema.Provider>
  );
}

export default CookieContext;
