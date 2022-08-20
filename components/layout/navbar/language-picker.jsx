import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  GlobeIcon,
  ChevronDownIcon,
  CheckIcon,
} from '@heroicons/react/outline';

import useLocale from '../../../hooks/useLocale';

import classes from './language-picker.module.scss';

function LanguagePicker() {
  const [state, setState] = useState(false);
  const locale = useLocale();
  const { pathname, query } = useRouter();
  const dropdown = useRef();
  const capLocale = locale.charAt(0).toUpperCase() + locale.slice(1);

  console.log(query);

  const toggleHandler = () => {
    setState(bol => !bol);
  };

  useEffect(() => {
    if (!state) return;
    function handleClick(event) {
      if (dropdown.current && !dropdown.current.contains(event.target)) {
        setState(false);
      }
    }
    window.addEventListener('click', handleClick);
    // clean up
    return () => window.removeEventListener('click', handleClick);
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
        <Link
          locale='fr'
          href={{
            pathname: pathname,
            query,
          }}
        >
          <a className={classes.label}>
            <CheckIcon
              className={`${classes.check} ${
                locale !== 'fr' && classes.checkinactive
              }`}
            />
            <span>Français</span>
          </a>
        </Link>

        <Link locale='en' href={{
            pathname: pathname,
            query,
          }}>
          <a className={classes.label}>
            <CheckIcon
              className={`${classes.check} ${
                locale !== 'en' && classes.checkinactive
              }`}
            />
            <span>English</span>
          </a>
        </Link>
      </div>
    </div>
  );
}

export default LanguagePicker;
