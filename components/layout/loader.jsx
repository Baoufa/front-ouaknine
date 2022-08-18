import AnimatedLogoLoader from './animated-logo-loader';
import classes from './loader.module.scss';

import { useState, useEffect } from 'react';
import useTimeout from '../../hooks/useTimout';

export default function Loader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.body.classList.add('body-full');
  }, []);

  useTimeout(() => {
    document.body.classList.remove('body-full');
    setIsLoading(false);
  }, 2800);

  return (
    <div className={`${classes.container} ${!isLoading && classes.off}`}>
      <AnimatedLogoLoader />
    </div>
  );
}
