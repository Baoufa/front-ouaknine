import classes from './expertise.module.scss';
import { useInView } from 'react-intersection-observer';
import ExpertiseCard from '../components/layout/expertise-card';
import clientApi from '../libs/clientApi';
import ExpertiseContent from '../content/expertiseContent.json';
import useLocale from '../hooks/useLocale';
import PageTitle from '../components/layout/page-title';
import { useRouter } from 'next/router';
import HeadPage from '../components/head/head-page';

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
    expertiseList,
  } = data;

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <div className={classes.container}>
      <HeadPage title={titleseo ? titleseo : ''} description={descriptionseo ? descriptionseo : ''} />
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
        <ul className={classes.spegroup}>
          {expertiseList &&
            expertiseList.map((item, index) => {
              return (
                <ExpertiseCard
                  key={item._id}
                  _id={item._id}
                  index={index}
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
    return {
      notFound: true,
    };
  }
}

export default Expertise;
