import { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NavContextSchema } from '../../../context/nav-context';
import LanguagePickerMobile from './language-picker-mobile';

import classes from './nav-mobile.module.scss';

function NavMobile({ navlinks }) {
  const { pathname } = useRouter();
  const { isOn, toggleNav } = useContext(NavContextSchema);
  let i = 0;

  return (
    <nav className={`${classes.nav} ${isOn && classes.visible}`}>
      <ul className={`${classes.navlist} ${isOn && classes.listvisible}`}>
        {navlinks &&
          navlinks.map((link, index) => {
            const animationCSS = `animation${index}`;
            const animationSepCSS = `animationsep${index}`;
            ++i;
            return (
              <li key={index} className={`${classes.navitem}`}>
                <Link href={link.attributes.url}>
                  <a
                    className={`${classes.link} ${classes[animationCSS]}`}
                    onClick={toggleNav}
                  >
                    {link.attributes.label}
                  </a>
                </Link>
                <div
                  className={`${classes.separator} ${classes[animationSepCSS]}`}
                ></div>
              </li>
            );
          })}
        <li
          className={`${classes.navitem} ${classes.langblock} ${classes[`animation${i}`]}`}
        >
          <LanguagePickerMobile />
          {/* <Link locale='fr' href={pathname} disabled={true}>
            <a className={classes.lang} onClick={toggleNav}>
              Fr
            </a>
          </Link>
          <span> / </span>
          <Link locale='en' href={pathname}>
            <a className={classes.lang} onClick={toggleNav}>
              En
            </a>
          </Link> */}
        </li>
      </ul>
    </nav>
  );
}

export default NavMobile;
