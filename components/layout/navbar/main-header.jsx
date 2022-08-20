import { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NavContextSchema } from '../../../context/nav-context';
import NavMobile from './nav-mobile';
import NavDesktop from './nav-desktop';
import NavMobileButton from './nav-mobile-button';
import classes from './main-header.module.scss';
import navlinks from '../../../content/headerContent.json';
import useLocale from '../../../hooks/useLocale';
import { useRouter } from 'next/router';

import AnimatedLogo from './animated-logo';
import logo from '../../../public/images/logodraft.svg';

function MainHeader() {
  const { isOn, toggleNav } = useContext(NavContextSchema);
  const locale = useLocale();
  const {pathname} = useRouter();
  return (
    <>
      <header className={`${classes.header} ${pathname.includes('/articles') ? classes.border : ''}`}>
        <div className={classes.navcontainer}>
          <Link href='/'>
            <a className={classes.logocontainer}>
              {/* <AnimatedLogo width={190 * 1.2} height={35.6 * 1.2}/> */}
              <Image
                className={classes.logo}
                src={logo}
                alt='logo'
                width={209}
                height={39.16}
                layout={'fixed'}
              />
            </a>
          </Link>
          <NavDesktop navlinks={navlinks[locale].nav} />
          <NavMobileButton />
        </div>
        <NavMobile navlinks={navlinks[locale].nav} onclick={toggleNav} />
      </header>
      {/* <div className={classes.banner}>
        <Image
          src='/images/abstract2.jpeg'
          alt='band'
          height={500}
          width={1600}
          objectFit='cover'
        />
      </div> */}
    </>
  );
}

export default MainHeader;
