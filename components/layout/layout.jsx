import { useState } from 'react';
import { useRouter } from 'next/router';

import MainHeader from './navbar/main-header';
import MainFooter from './footer/main-footer';
import HeadBase from '../head/head-base';

import classes from './layout.module.scss';
import Loader from './loader';

function Layout(props) {
  const router = useRouter();

  return (
    <>
      <Loader />
          <HeadBase seo={props.seo} />
          <MainHeader navlinks={props.navlinks} />
          <main className={classes.main}>{props.children}</main>
          <MainFooter />
        </>
  );
}

export default Layout;
