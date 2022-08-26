import { useContext, useState, useEffect } from 'react';
import useDebounce from '../../../hooks/useDebounce';
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
import useTimeout from '../../../hooks/useTimout';

function MainHeader() {
  const { isOn, toggleNav } = useContext(NavContextSchema);
  const locale = useLocale();
  const { pathname } = useRouter();

  const [isFilled, setIsFilled] = useState(true);
  const [isAnimated, setIsAnimated] = useState(false);

  const clickHandler = () => {
  if(pathname !== '/'){
    setTimeout(()=>{
      setIsFilled(false);
      setIsAnimated(true);
      console.log('time')
    },100)
  } else {
    setIsFilled(false);
    setIsAnimated(true);
    console.log('notime')
  }
  };

  useDebounce(
    () => {
      if (isAnimated) {
        setIsFilled(true);
        setIsAnimated(false);
      }
    },
    3200,
    [isFilled]
  );

  return (
    <>
      <header
        className={`${classes.header} ${
          pathname.includes('/articles') ? classes.border : ''
        }`}
      >
        <div className={classes.navcontainer}>
          <Link href='/'>
            <a className={classes.logocontainer} onClick={clickHandler} alt={"Logo image Alice Ouaknine, Droit Pénal, Criminal Law, Paris, France"} aria-label={"Logo image Alice Ouaknine, Droit Pénal, Criminal Law, Paris, France"} >
              <AnimatedLogo
                width={209}
                height={39.16}
                on={isAnimated}
                isFilled={isFilled}
              />

              {/* {!isAnimated && (
                <Image
                  className={classes.logo}
                  src={logo}
                  alt='logo'
                  layout={'responsive'}
                />
              )} */}
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
