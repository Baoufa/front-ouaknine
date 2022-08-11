import Link from 'next/link';
import { useRouter } from 'next/router';
import useLocale from '../../../hooks/useLocale';
import LanguagePicker from './language-picker';

import classes from './nav-desktop.module.scss';



function NavDesktop({ navlinks }) {
  const { pathname } = useRouter();
  const locale = useLocale();

  return (
    <nav className={classes.nav}>
      <ul className={classes.navlist}>
        {navlinks &&
          navlinks.map((link, index) => {
            return (
            <li key={index}>
              <Link href={link.link}>
                <a
                  className={`${classes.navitem} ${
                    pathname === link.link ? classes.active : ''
                  }`}
                >
                  {link[locale]}
                </a>
              </Link>
            </li>)}
          )}
      </ul>
      <div className={classes.locales}>
        <LanguagePicker />
      </div>
    </nav>
  );
}

export default NavDesktop;
