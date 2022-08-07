import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import { GlobeIcon, ChevronDownIcon } from '@heroicons/react/outline';
import useLocale from '../../../hooks/useLocale';

import classes from './language-picker.module.scss';

function LanguagePicker() {
  const [state, setState] = useState(false);
  const locale = useLocale();
  const { pathname } = useRouter();
  const dropdown = useRef();
  const capLocale = locale.charAt(0).toUpperCase() + locale.slice(1);

  const toggleHandler = () => {
    setState(bol => !bol);
  };

  useEffect(() => {
    if (!state) return;
    function handleClick(event) {
      console.log('here');
      if (dropdown.current && !dropdown.current.contains(event.target)) {
        setState(false);
      }
    }
    window.addEventListener("click", handleClick);
    // clean up
    return () => window.removeEventListener("click", handleClick);
  }, [state]);


  return (
    <div className={classes.container} onClick={toggleHandler} ref={dropdown}>
      <div className={classes.innercontainer}>
        <div className={classes.firstgroup}>
          <GlobeIcon className={classes.svg} />
          <div className={classes.tag}>{capLocale}</div>
        </div>

        <ChevronDownIcon
          className={`${classes.svg} ${state && classes.svgactive}`}
        />
      </div>
      <div className={`${classes.selector} ${state && classes.selectoractive}`}>
        <Link locale='fr' href={pathname}>
          <a className={classes.label}>Français</a>
        </Link>
        <Link locale='en' href={pathname}>
          <a className={classes.label}>English</a>
        </Link>
      </div>
    </div>
  );
}

export default LanguagePicker;
