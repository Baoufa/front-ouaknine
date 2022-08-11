import { useContext, useRef, useEffect } from 'react';
import Link from 'next/link';
import { NavContextSchema } from '../../../context/nav-context';
import NavMobile from './nav-mobile';
import NavDesktop from './nav-desktop';
import NavMobileButton from './nav-mobile-button';
import classes from './main-header.module.scss';

import AnimatedLogo from './animated-logo';

function MainHeader({ navlinks }) {
  const { isOn, toggleNav } = useContext(NavContextSchema);


  return (
    <header className={classes.header}>
      <div className={classes.navcontainer}>
        <Link href='/'>
          <AnimatedLogo />
        </Link>
        <NavDesktop navlinks={navlinks} />
        <NavMobileButton />
      </div>
      <NavMobile navlinks={navlinks} onclick={toggleNav} />
    </header>
  );
}

export default MainHeader;
