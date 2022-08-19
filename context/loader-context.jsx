import { createContext, useState, useEffect } from 'react';


export const LoaderContextSchema = createContext({
  isLoading: null,
  setIsLoading: () => {},
});

function LoaderContext(props) {
  const [state, setState] = useState({
    isLoading: true,
    setIsLoading : (bol) => {
      setState(prevState => ({ ...prevState, isLoading: bol}));
    }
  });

  return (
    <LoaderContextSchema.Provider value={state}>
      {props.children}
    </LoaderContextSchema.Provider>
  );
}

export default LoaderContext;
