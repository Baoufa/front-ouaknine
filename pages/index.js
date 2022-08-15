import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import clientApi from '../libs/clientApi';
import classes from './Home.module.scss';
import RichText from '../components/ui/rich-text.jsx';
import {ChevronDoubleDownIcon} from '@heroicons/react/outline';

export default function Home({ data }) {
  
  const {
    titleseo,
    descriptionseo,
    title,
    body,
    imageUrl,
    imageTitle,
    lqip,
    imgRatio,
  } = data;

  // A scroller function that takes element id and smooth scrolls to it.
const scroll2El = elID => {
  globalThis.scrollTo({
    top: document.getElementById(elID).offsetTop,
    behavior: 'smooth',
  });
};

  return (
    <div className={classes.container}>
      <div className={classes.upper}>
        <div className={classes.titlegroup}>
        <h1
          className={classes.title}
        >{`Avocate aux barreaux \nde Paris & de Californie`}</h1>
        <p
          className={classes.subtitle}
        >{`Droit Pénal - Droit Pénal des Affaires - Cybercriminalité`}</p>
        </div>
        {/* <Link href="/#homedesc" scroll={false}> */}
        <ChevronDoubleDownIcon className={classes.arrow} onClick={() => scroll2El('homedesc')} />
        {/* </Link> */}
       
      </div>

      <section className={classes.bottom} id='homedesc'>
        <div className={classes.image}>
          <Image
            src={imageUrl}
            alt={imageTitle}
            width={1000 * imgRatio}
            height={1000}
            objectFit={'cover'}
            blurDataURL={lqip}
            placeholder={'blur'}
          />
        </div>
        <div className={classes.desc}>
          <div className={classes.descinner}>
          <RichText value={body} />
          </div>
         
        </div>
      </section>
    </div>
  );
}

export async function getStaticProps(ctx) {
  const locale = ctx.locale;

  try {
    const content = await clientApi.fetch(
      `*[_type == "home" && language == "${locale}"]{
        titleseo, 
        descriptionseo, 
        title, 
        body,   
        "imageUrl": mainImage.asset->url,
        "imageTitle" : mainImage.title,
        "imgRatio" : mainImage.asset->metadata.dimensions.aspectRatio,
        "lqip": mainImage.asset->metadata.lqip}`
    );
    return { props: { data: content?.length && content[0] } };
  } catch (err) {
    console.log(err.message);
    return { props: { data: null } };
  }
}
