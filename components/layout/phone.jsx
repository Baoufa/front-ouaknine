import { PhoneIcon } from '@heroicons/react/solid';
import classes from './phone.module.scss';

function Phone() {
  return (
    <a className={classes.phone} href='tel:+33652257147'>
      <PhoneIcon className={classes.svg} />
    </a>
  );
}

export default Phone;
