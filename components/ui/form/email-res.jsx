import {
  CheckCircleIcon,
  ExclamationIcon,
  MailIcon,
} from '@heroicons/react/outline';
import Button from '../button';

import classes from './email-res.module.scss';

function EmailRes(props) {
  if (props.ok) {
    return (
      <div className={classes.container}>
        <CheckCircleIcon className={classes.checkok} />
        <h2 className={classes.title}>Votre message a bien été envoyé</h2>
        <p className={classes.subtitle}>
          Nous vous répondrons dans les plus bref délais
        </p>
      </div>
    );
  } else {
    return (
      <div className={classes.container}>
        <ExclamationIcon className={classes.checknot} />
        <h2 className={classes.title}>
          {"Votre message n'a pas pu être envoyé"}
        </h2>
        <p className={classes.subtitle}>
          Vous pouvez nous envoyer un email à :
        </p>
        <Button
          className={classes.button}
          href='mailto:cabinet@ouaknine-avocat.com'
          target='_self'
        >
          <MailIcon className={classes.svg} />
          <span>cabinet@ouaknine-avocat.com</span>
        </Button>
      </div>
    );
  }
}

export default EmailRes;
