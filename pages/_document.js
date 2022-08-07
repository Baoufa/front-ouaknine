import { Html, Head, Main, NextScript } from 'next/document';
import { useContext, useEffect } from 'react';
import { NavContextSchema } from '../context/nav-context';

export default function Document() {
  const {isOn} = useContext(NavContextSchema);

  useEffect(() => {
   console.log(isOn)
  }, [isOn])
  

  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}