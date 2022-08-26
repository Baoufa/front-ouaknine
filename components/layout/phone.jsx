import { PhoneIcon } from '@heroicons/react/solid';
import classes from './phone.module.scss';
import useLocale from '../../hooks/useLocale';

import CONTENT from '../../content/phoneContent.json'

function Phone() {
  const locale = useLocale();
  return (
    <button className={classes.phone} href='tel:+33652257147' alt={CONTENT[locale].alt} aria-label={CONTENT[locale].alt}>
      <PhoneIcon className={classes.svg} />
    </button>
  );
}

export default Phone;
