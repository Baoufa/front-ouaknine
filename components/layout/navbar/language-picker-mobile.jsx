import classes from './language-picker-mobile.module.scss';
import useLocale from '../../../hooks/useLocale';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function LanguagePickerMobile(props) {
  const locale = useLocale();
  const router = useRouter();
  const [state, setState] = useState(locale);

  const { pathname, asPath, query } = router;

  const toggleHandler = loc => {
    setState(l => loc);
    router.push({ pathname, query }, asPath, { locale: loc });
    props.onClick();
  };

  return (
    <div className={classes.container}>
      <div className={classes.switch}>
        <div
          className={`${classes.toggle} ${
            locale === 'en' && classes.toggleactive
          }`}
        ></div>
        <span
          className={`${classes.label} ${
            locale === 'en' && classes.labelactive
          }`}
          onClick={() => toggleHandler('fr')}
        >
          Français
        </span>
        <span
          className={`${classes.label} ${
            locale === 'fr' && classes.labelactive
          }`}
          onClick={() => toggleHandler('en')}
        >
          English
        </span>
      </div>
    </div>
  );
}

export default LanguagePickerMobile;
