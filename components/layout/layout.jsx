import MainHeader from './navbar/main-header';
import MainFooter from './footer/main-footer';
import Cookie from './cookie';

import classes from './layout.module.scss';
import Loader from './loader';

import { useContext } from 'react';
import { CookieContextSchema } from '../../context/cookie-context';
import { NavContextSchema } from '../../context/nav-context';

function Layout(props) {
  const { doNotShow } = useContext(CookieContextSchema);
  const { isOn } = useContext(NavContextSchema);

  return (
    <>
      <Loader />
      {!doNotShow && !isOn && <Cookie />}
      <MainHeader />
      <main className={classes.main}>{props.children}</main>
      <MainFooter />
    </>
  );
}

export default Layout;
