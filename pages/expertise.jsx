import Image from 'next/image';
import Link from 'next/link';
import classes from './expertise.module.scss';
import { ArrowSmRightIcon } from '@heroicons/react/outline';
import scale from '../public/images/scale.svg' 
import AnimatedScale from '../components/layout/animated-scale';

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

import scrollTo from '../libs/scrollTo';

function Expertise({ data }) {
  const locale = useLocale();

  const {
    titleseo,
    descriptionseo,
    title,
    subtitle,
    white,
    imageBg,
    imageTitle,
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
      <PageTitle
        title={title ? title : ''}
        subtitle={subtitle ? subtitle : ''}
        btn={true}
        onClick1={() => scrollTo('section1')}
        onClick2={() => scrollTo('section2')}
        label1={titleSection1 ? titleSection1 : ''}
        label2={titleSection2 ? titleSection2 : ''}
        imgUrl={imageBg ? `${imageBg?.url}?w=1600` : null}
        imgAlt={imageTitle ? imageTitle?.alt : null}
        imgRatio={imageBg ? imageBg?.metadata.dimensions.aspectRatio : 1}
        imgLqip={imageBg ? imageBg?.metadata.lqip : null}
        white={white ? white : false}
      />

      <section id='section1' className={classes.section1}>
        <div className={`${classes.sectiontitlegroup} ${classes.span2}`}>
          {titleSection1 && (
            <h2 className={classes.sectiontitle}>{titleSection1}</h2>
          )}
          {descSection1 && (
            <RichText
              value={descSection1}
              className={classes.setionsubtitle}
            ></RichText>
          )}
        </div>

        <ul className={classes.spegroup}>
          {expertiseList &&
            expertiseList.map((item, index) => {
              return (
                <>
                <ExpertiseCard key={item._key} 
                index={index}
                imgUrl={`${imageItemsArray[index]?.url}?w=1000`}
                blurDataURL={imageItemsArray[index]?.metadata?.lqip}
                title={item?.title}
                description={item?.description}
                linkLabel={ExpertiseContent[locale].contactLinkLabel}
                isAnimated={index === 0 ? false : true }
                length={expertiseList.length}
                />
          
                
                </>
                
              );
            })}
        </ul>
      </section>
      <div className={classes.separator} ref={ref}>
            {/* <Image src={scale} alt={'scale'} layout={'responsive'} /> */}
            <AnimatedScale animate={inView} />
      </div>
      <section id='section2' className={classes.section2}>
        <div className={classes.phasegroup}>
          <div className={classes.phasegroupinner}>
        
            {titleSection2 && (
              <h2 className={`${classes.sectiontitle} ${classes.sectiontitle2}`}>{titleSection2}</h2>
            )}
            {descSection2 && <RichText value={descSection2} />}
            <div className={classes.linkcontainer}>
              <Link href='/contact'>
                <a className={classes.link}>
                  <span>{ExpertiseContent[locale].contactLinkLabel}</span>
                  <ArrowSmRightIcon className={classes.arrowlink} />
                </a>
              </Link>
            </div>
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
      `*[_type == "expertise" && language == "${locale}"]{
        ...,
        "imageItemsArray":expertiseList[].imageTitle.asset->,
        "imageBg":imageTitle.asset->
            }`
    );
    return { props: { data: content?.length && content[0] } };
  } catch (err) {
    console.log(err.message);
    return {
      notFound: true,
    }
  }
}

export default Expertise;
