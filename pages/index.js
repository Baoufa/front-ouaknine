import Head from 'next/head';
import Image from 'next/image';

import classes from './Home.module.scss';



export default function Home(props) {
  
  return (
    <div>
      <h1
        className={classes.title}
      >{`Droit Pénal &\nDroit Pénal des Affaires`}</h1>
    </div>
  );
}

export async function getStaticProps(ctx) {
  return {
    props: {
      data: null,
    },
  };
}
