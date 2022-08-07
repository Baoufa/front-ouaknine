import Head from 'next/head';
import Image from 'next/image';

import classes from './Home.module.scss';

export default function Home(props) {
  return <h1 className={classes.title}>{`Avocate aux Barreaux \nde Paris & de Californie (US)`}</h1>;
}

export async function getStaticProps(ctx) {
  return {
    props: {
      data: null,
    },
  };
}
