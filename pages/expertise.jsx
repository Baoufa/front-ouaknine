import Image from 'next/image';
import Link from 'next/link';
import classes from './expertise.module.scss';
import { ArrowSmRightIcon } from '@heroicons/react/outline';

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
    imageBg,
    imageTitle,
    titleSection1,
    descSection1,
    expertiseList,
    imageItemsArray,
    titleSection2,
    descSection2,
  } = data;

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
                <li key={item._key} className={`${classes.spe}`}>
                  <div className={classes.spe_top}>
                    {imageItemsArray[index]?.url && (
                      <Image
                        src={`${imageItemsArray[index].url}?w=1000`}
                        alt={'alt'}
                        objectFit={'cover'}
                        layout={'fill'}
                        objectPosition={'center'}
                        blurDataURL={imageItemsArray[index]?.metadata?.lqip}
                        placeholder={'blur'}
                        sizes='(min-width: 75em) 33vw,
              (min-width: 48em) 50vw,
              100vw'
                      />
                    )}
                    <div className={classes.overlay}></div>
                  </div>
                  <div className={classes.spe_bottom}>
                    <div className={classes.spe_bottominner}>
                      {item?.title && (
                        <h3 className={classes.spe_title}>{item.title}</h3>
                      )}
                      {item?.description && (
                        <RichText value={item.description} />
                      )}
                    </div>

                    <div className={classes.spe_linkcontainer}>
                      <Link href='/contact'>
                        <a className={classes.spe_link}>
                          <span>
                            {ExpertiseContent[locale].contactLinkLabel}
                          </span>
                          <ArrowSmRightIcon className={classes.arrowlink} />
                        </a>
                      </Link>
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      </section>
      <div className={classes.separator}></div>
      <section id='section2' className={classes.phasegroup}>
        {titleSection2 && (
          <h2 className={classes.sectiontitle}>{titleSection2}</h2>
        )}
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
    return { props: { data: null } };
  }
}

export default Expertise;
