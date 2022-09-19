import { createContext, useState, useEffect } from 'react';


export const LoaderContextSchema = createContext({
  isLoading: null,
  hasLoaded: null,
  setIsLoading: () => {},
});

function LoaderContext(props) {
  const [state, setState] = useState({
    isLoading: true,
    hasLoaded: false,
    setIsLoading : (bol) => {
      setState(prevState => ({ ...prevState, isLoading: bol}));
    },
    setHasLoaded : (bol) => {
      setState(prevState => ({ ...prevState, hasLoaded: bol}));
    }
  });

  useEffect(() => {
    if(!state.isLoading){
      state.setHasLoaded(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isLoading])
  

  return (
    <LoaderContextSchema.Provider value={state}>
      {props.children}
    </LoaderContextSchema.Provider>
  );
}

export default LoaderContext;
