import { useContext } from 'react';
import Link from 'next/link';

import { NavContextSchema } from '../../../context/nav-context';
import NavMobile from './nav-mobile';
import NavDesktop from './nav-desktop';
import NavMobileButton from './nav-mobile-button';
import classes from './main-header.module.scss';

function MainHeader({ navlinks }) {
  const { isOn, toggleNav } = useContext(NavContextSchema);
  const sortedNavLinks = navlinks.sort((a, b) => a.attributes.order - b.attributes.order);

  return (
    <header className={classes.header}>
      <div className={classes.navcontainer}>
        <div className={classes.logo}>
          <Link href='/'>{`Alice Ouaknine \nAvocate`}</Link>
        </div>
        <NavDesktop navlinks={sortedNavLinks} />
        <NavMobileButton />
      </div>
      <NavMobile navlinks={sortedNavLinks} onclick={toggleNav} />
    </header>
  );
}

export default MainHeader;
