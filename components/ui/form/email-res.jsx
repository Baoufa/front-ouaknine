import {
  CheckCircleIcon,
  ExclamationIcon,
  MailIcon,
} from '@heroicons/react/outline';
import Button from '../button';
import useLocale from '../../../hooks/useLocale';
import CONTENT from '../../../content/emailResContent.json'

import classes from './email-res.module.scss';

function EmailRes(props) {
  const locale = useLocale();


  if (props.ok) {
    return (
      <div className={classes.container}>
        <CheckCircleIcon className={classes.checkok} />
        <p className={classes.title}>{CONTENT[locale].okTitle}</p>
        <p className={classes.subtitle}>
        {CONTENT[locale].okBody}
        </p>
      </div>
    );
  } else {
    return (
      <div className={classes.container}>
        <ExclamationIcon className={classes.checknot} />
        <p className={classes.title}>
        {CONTENT[locale].noTitle}
        </p>
        <p className={classes.subtitle}>
        {CONTENT[locale].noBody}
        </p>
        <Button
          className={classes.button}
          href='mailto:cabinet@ouaknine-avocats.com'
          target='_self'
        >
          <MailIcon className={classes.svg} />
          <span>cabinet@ouaknine-avocats.com</span>
        </Button>
      </div>
    );
  }
}

export default EmailRes;
