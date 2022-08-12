import Head from 'next/head';
import Image from 'next/image';

import classes from './Home.module.scss';




export default function Home(props) {
  
  return (
    <div>
      <h1
        className={classes.title}
      >{`Avocate aux barreaux \nde Paris de Californie`}</h1>
      <h2>{`Droit Pénal - Droit Pénal des Affaires - Cybercriminalité`}</h2>
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
