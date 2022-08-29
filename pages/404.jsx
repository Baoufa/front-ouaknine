import CONTENT from '../content/404Content.json';
import useLocale from '../hooks/useLocale';

import classes from './404.module.scss';

function Page404() {
  const locale = useLocale();

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>
      {CONTENT[locale].body}
      </h1>
    
    </div>
  );
}

export default Page404;