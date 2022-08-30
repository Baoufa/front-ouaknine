import Link from 'next/link';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import clientApi from '../libs/clientApi';
import RichText from '../components/ui/rich-text.jsx';
import { ChevronDoubleDownIcon } from '@heroicons/react/outline';
import scrollTo from '../libs/scrollTo';
import AnimatedScale from '../components/layout/animated-scale';

import { useRef, useState } from 'react';
import HeadPage from '../components/head/head-page';

import classes from './Home.module.scss';

import useOffset from '../hooks/useOffset';
import AnimatedScaleMobile from '../components/layout/animated-scale-mobile';

export default function Home({ data }) {
  const {
    titleseo,
    descriptionseo,
    title1,
    title2,
    tag1,
    link1,
    tag2,
    link2,
    tag3,
    link3,
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
    threshold: 0.1,
    triggerOnce: true,
  });
  const scaleRef = useRef();
  const [percentView, setPercentView] = useState(1);

  useOffset(percentView, setPercentView, scaleRef, 200, 1);

  return (
    <div className={classes.container}>
      <HeadPage title={titleseo} description={descriptionseo} />
      <div className={classes.upper}>
        <Image
          className={classes.img}
          src={imageTitleUrl ? `${imageTitleUrl}?w=1600` : ''}
          alt={imageTitleAlt ? imageTitleAlt : 'Image background'}
          objectFit={'cover'}
          layout={'fill'}
          objectPosition={'center'}
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
                <Link href={{ pathname: '/expertise', query: { _id: link1 } }}>
                  <a
                    className={`${classes.spe} ${!white && classes.spe_black}`}
                  >
                    {tag1?.trim()}
                  </a>
                </Link>
              )}
              {tag2 && (
                <Link href={{ pathname: '/expertise', query: { _id: link2 } }}>
                  <a
                    className={`${classes.spe} ${!white && classes.spe_black}`}
                  >
                    {tag2?.trim()}
                  </a>
                </Link>
              )}
              {tag3 && (
                <Link href={{ pathname: '/expertise', query: { _id: link3 } }}>
                  <a
                    className={`${classes.spe} ${!white && classes.spe_black}`}
                  >
                    {tag3?.trim()}
                  </a>
                </Link>
              )}
            </div>
          </div>
          {/* <Link href="/#homedesc" scroll={false}> */}

          <ChevronDoubleDownIcon
            className={`${classes.arrow} ${!white && classes.arrow_black}`}
            onClick={() => scrollTo('homedesc')}
          />

          {/* </Link> */}
        </div>
      </div>

      <div className={classes.separator} id='section2'>
        <div ref={scaleRef}>
          <AnimatedScale animate={inView} percentView={percentView} />
          <AnimatedScaleMobile animate={inView} percentView={percentView} />
        </div>
      </div>

      <section className={classes.bottom} id='homedesc'>
        <div className={`${classes.image}`} ref={ref}>
          {imageUrl && (
            <Image
              src={`${imageUrl}?w=700`}
              alt={imageAlt}
              width={700}
              height={700 / imgRatio}
              objectFit={'cover'}
              blurDataURL={lqip}
              placeholder={'blur'}
              sizes='(min-width: 769px) 25vw,
              50vw'
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
        "link1": link1->_id,
        tag2,
        "link2": link2->_id,
        tag3, 
        "link3": link3->_id,
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
    return { props: { data: content?.length && content[0] }, revalidate: 10 };
  } catch (err) {
    return {
      notFound: true,
    };
  }
}
