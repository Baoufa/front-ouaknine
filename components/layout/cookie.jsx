import { useContext } from 'react';
import Image from 'next/image';

import useLocale from '../../hooks/useLocale';

import Button from '../ui/button';
import { CookieContextSchema } from '../../context/cookie-context';
import { LoaderContextSchema } from '../../context/loader-context';
import { ShieldCheckIcon, XCircleIcon } from '@heroicons/react/outline';

import CookieImg from '../../public/images/cookie.svg';

import CONTENT from '../../content/cookieContent.json'
import classes from './cookie.module.scss';

function Cookie() {
  const { isAccepted, acceptCookie, denyCookie } =
    useContext(CookieContextSchema);

  const { isLoading } = useContext(LoaderContextSchema);

  const locale = useLocale();

  return (
    <div className={`${classes.container} ${!isLoading && classes.show}`}>
      <div className={classes.cookie}>
        <Image src={CookieImg} width={70} height={70} alt='cookie' />
      </div>

      <div className={classes.right}>
        <div>
          <h3 className={classes.title}>{CONTENT[locale].title}</h3>
          <p className={classes.desc}>{CONTENT[locale].body}
          </p>
        </div>

        <div className={classes.btngroup}>
          <Button onClick={acceptCookie}>
            <span>{CONTENT[locale].accept}</span>
            <ShieldCheckIcon className={`${classes.svg} ${classes.accept}`} />
          </Button>
          <Button onClick={denyCookie}>
            <span>{CONTENT[locale].decline}</span>
            <XCircleIcon className={`${classes.svg} ${classes.deny}`} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Cookie;
