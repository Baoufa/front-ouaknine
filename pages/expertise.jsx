import Image from 'next/image';
import Link from 'next/link';
import classes from './expertise.module.scss';
import { ArrowSmRightIcon } from '@heroicons/react/outline';
import scale from '../public/images/scale.svg';
import AnimatedScale from '../components/layout/animated-scale-center';

import { useInView } from 'react-intersection-observer';

import ExpertiseCard from '../components/layout/expertise-card';

import clientApi from '../libs/clientApi';

import RichText from '../components/ui/rich-text';

import ExpertiseContent from '../content/expertiseContent.json';

import useLocale from '../hooks/useLocale';

import imgDefault from '../public/images/alex-vasey-tDuQe2ShHpk-unsplash.jpeg';
import imgCriminal from '../public/images/expertise/criminal.jpeg';
import imgMeeting from '../public/images/expertise/meeting.jpeg';
import PageTitle from '../components/layout/page-title';
import { useRouter } from 'next/router';

import HeadPage from '../components/head/head-page';

import scrollTo from '../libs/scrollTo';

function Expertise({ data }) {
  const locale = useLocale();
  const { query } = useRouter();

  const {
    titleseo,
    descriptionseo,
    title,
    subtitle,
    white,
    imageTitleUrl,
    imageTitleAlt,
    imgRatioTitle,
    lqipTitle,
    titleSection1,
    descSection1,
    expertiseList,
    imageItemsArray,
    titleSection2,
    descSection2,
  } = data;

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <div className={classes.container}>
      <HeadPage title={titleseo} description={descriptionseo} />
      <PageTitle
        title={title ? title : ''}
        subtitle={subtitle ? subtitle : ''}
        btn={false}
        imgUrl={imageTitleUrl ? `${imageTitleUrl}?w=1600` : null}
        imgAlt={imageTitleAlt ? imageTitleAlt : 'Background image'}
        imgRatio={imgRatioTitle ? imgRatioTitle : 1}
        imgLqip={lqipTitle ? lqipTitle : null}
        white={white ? white : false}
        position={'center'}
      />

      <section id='section1' className={classes.section1}>
        {/* <div className={`${classes.sectiontitlegroup} ${classes.span2}`}>
          {titleSection1 && (
            <h2 className={classes.sectiontitle}>{titleSection1}</h2>
          )}
          {descSection1 && (
            <RichText
              value={descSection1}
            ></RichText>
          )}
        </div> */}
        <ul className={classes.spegroup}>
          {expertiseList &&
            expertiseList.map((item, index) => {
              return (
                <ExpertiseCard
                  key={item._id}
                  _id={item._id}
                  index={index}
                  // imgUrl={`${imageItemsArray[index]?.url}?w=1000`}
                  // blurDataURL={imageItemsArray[index]?.metadata?.lqip}

                  title={item?.title}
                  description={item?.description}
                  titleSpe={item?.titleSpe}
                  right={item?.right}
                  linkLabel={ExpertiseContent[locale].contactLinkLabel}
                  isAnimated={index === 0 ? false : true}
                  length={expertiseList.length}
                  query={query}
                />
              );
            })}
        </ul>
      </section>
    </div>
  );
}

export async function getStaticProps(ctx) {
  const locale = ctx.locale;

  try {
    const content = await clientApi.fetch(
      `*[_type == "expertise" && language == "${locale}"]{
        ...,
        "imageTitleUrl": imageTitle.asset->url,
        "imageTitleAlt" : imageTitle.alt,
        "imgRatioTitle" : imageTitle.asset->metadata.dimensions.aspectRatio,
        "lqipTitle": imageTitle.asset->metadata.lqip,
        "expertiseList": expertiseList[]->
            }`
    );
    return { props: { data: content?.length && content[0] }, revalidate: 10 };
  } catch (err) {
    console.log(err.message);
    return {
      notFound: true,
    };
  }
}

export default Expertise;
