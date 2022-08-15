import { useContext } from 'react';
import Link from 'next/link';
import { NavContextSchema } from '../../../context/nav-context';
import NavMobile from './nav-mobile';
import NavDesktop from './nav-desktop';
import NavMobileButton from './nav-mobile-button';
import classes from './main-header.module.scss';
import navlinks from '../../../content/headerContent.json'
import useLocale from '../../../hooks/useLocale';

import AnimatedLogo from './animated-logo';

function MainHeader(props) {
  const { isOn, toggleNav } = useContext(NavContextSchema);
  const locale = useLocale();

  return (
    <>
      <header className={classes.header}>
        <div className={classes.navcontainer}>
          <Link href='/'>
            <a>
              <AnimatedLogo />
            </a>
          </Link>
          <NavDesktop navlinks={navlinks[locale].nav} />
          <NavMobileButton />
        </div>
        <NavMobile navlinks={navlinks[locale].nav} onclick={toggleNav} />
      </header>
      {/* < Image src='/images/bg2.jpeg' alt='band' height={70} width={1600} objectFit='cover'/> */}
    </>
  );
}

export default MainHeader;
