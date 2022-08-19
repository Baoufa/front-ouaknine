import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import clientApi from '../libs/clientApi';
import RichText from '../components/ui/rich-text.jsx';
import { ChevronDoubleDownIcon } from '@heroicons/react/outline';
import scrollTo from '../libs/scrollTo';

import img from '../public/images/abstract4.jpeg';

import classes from './Home.module.scss';

export default function Home({ data }) {
  const {
    title1,
    title2,
    tag1,
    tag2,
    tag3,
    white,
    imageTitleUrl,
    imageTitleAlt,
    imgRatioTitle,
    lqipTitle,
    sectionTitle,
    body,
    imageUrl,
    imageAlt,
    lqip,
    imgRatio,
  } = data;

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <div className={classes.container}>
      <div className={classes.upper}>
        <Image
          className={classes.img}
          src={imageTitleUrl ? `${imageTitleUrl}?w=1600` : img}
          alt={imageTitleAlt ? imageTitleAlt : 'Image background'}
          objectFit={'cover'}
          layout={'fill'}
          objectPosition={'top right'}
          blurDataURL={lqipTitle ? lqipTitle : null}
          placeholder={'empty'}
          sizes='100vw'
          priority
          quality={30}
        />

        <div className={classes.overlay}></div>

        <div className={`${classes.upperinner}`}>
          <div className={`${classes.titlegroup} ${!white && classes.black}`}>
            {title1 && title2 && (
              <h1>
                <p className={classes.title}>{title1?.trim()}</p>
                <p className={classes.subtitle}>{title2?.trim()}</p>
              </h1>
            )}
            <div className={classes.spegroup}>
              {tag1 && (
                <Link href='/expertise'>
                  <a className={`${classes.spe} ${!white && classes.spe_black}`}>{tag1?.trim()}</a>
                </Link>
              )}
              {tag2 && (
                <Link href='/expertise'>
                  <a className={`${classes.spe} ${!white && classes.spe_black}`}>{tag2?.trim()}</a>
                </Link>
              )}
              {tag3 && (
                <Link href='/expertise'>
                  <a className={`${classes.spe} ${!white && classes.spe_black}`}>{tag3?.trim()}</a>
                </Link>
              )}
            </div>
          </div>
          {/* <Link href="/#homedesc" scroll={false}> */}

          <ChevronDoubleDownIcon
            className={classes.arrow}
            onClick={() => scrollTo('homedesc')}
          />

          {/* </Link> */}
        </div>
      </div>

      <section className={classes.bottom} id='homedesc'>
        <div className={`${classes.image} ${inView && classes.show}`} ref={ref}>
          {imageUrl && (
            <Image
              src={`${imageUrl}?w=700`}
              alt={imageAlt}
              width={700}
              height={700 / imgRatio}
              objectFit={'cover'}
              blurDataURL={lqip}
              placeholder={'blur'}
              sizes='(min-width: 75em) 33vw,
              (min-width: 48em) 50vw,
              100vw'
              quality={50}
            />
          )}
        </div>
        <div className={`${classes.desc}`}>
          <div className={classes.descinner}>
            {sectionTitle && (
              <h2 className={classes.bottomtitle}>{sectionTitle?.trim()}</h2>
            )}
            {body && <RichText value={body} />}
          </div>
        </div>
      </section>

      {/* <Image src={'/images/scale.svg'} width={1400} height={129.09} alt={'test'} /> */}
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
        title1,
        title2,
        tag1,
        tag2,
        tag3, 
        white,
        "imageTitleUrl": imageTitle.asset->url,
        "imageTitleAlt" : imageTitle.alt,
        "imgRatioTitle" : imageTitle.asset->metadata.dimensions.aspectRatio,
        "lqipTitle": imageTitle.asset->metadata.lqip,
        sectionTitle,
        body,   
        "imageUrl": mainImage.asset->url,
        "imageAlt" : mainImage.title,
        "imgRatio" : mainImage.asset->metadata.dimensions.aspectRatio,
        "lqip": mainImage.asset->metadata.lqip}`
    );
    return { props: { data: content?.length && content[0] } };
  } catch (err) {
    console.log(err.message);
    return { props: { data: null } };
  }
}
