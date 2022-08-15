import Link from 'next/link';
import { useRouter } from 'next/router';
import LanguagePicker from './language-picker';
import classes from './nav-desktop.module.scss';

function NavDesktop({ navlinks }) {
  const { pathname } = useRouter();

  return (
    <nav className={classes.nav}>
      <ul className={classes.navlist}>
        {navlinks &&
          navlinks.map((link, index) => {
            console.log(link)
            return (
            <li key={index}>
              <Link href={link.url}>
                <a
                  className={`${classes.navitem} ${
                    pathname === link.url ? classes.active : ''
                  }`}
                >
                  {link.label}
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
