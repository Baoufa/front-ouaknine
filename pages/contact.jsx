import classes from './contact.module.scss';
import Form from '../components/ui/form/form';

import RichText from '../components/ui/rich-text';
import contactContent from '../content/contactContent.json';

import useLocale from '../hooks/useLocale';
import clientApi from '../libs/clientApi';
import Image from 'next/image';
import mapImage from '../public/images/maptrans.svg';
import googlePin from '../public/images/googlemaps_icon.svg';
import HeadPage from '../components/head/head-page';

import Button from '../components/ui/button';
import { PhoneIcon } from '@heroicons/react/solid';

import PageTitle from '../components/layout/page-title';

function Contact({ data }) {
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
    titlebox,
    titleform,
    body,
    subform,
  } = data;
  const locale = useLocale();

  return (
    <div>
      <HeadPage title={titleseo} description={descriptionseo} />

      <PageTitle
        title={title ? title : ''}
        subtitle={subtitle ? subtitle : ''}
        btn={false}
        imgUrl={imageTitleUrl ? `${imageTitleUrl}?w=1600&blur=100` : null}
        imgAlt={imageTitleAlt ? imageTitleAlt : 'Background image'}
        imgRatio={imgRatioTitle ? imgRatioTitle : 1}
        imgLqip={lqipTitle ? lqipTitle : null}
        white={white ? white : false}
      />
      <section className={classes.container}>
        <div className={classes.grid}>
          <div className={classes.leftblock}>
            <div className={classes.leftblockinner}>
              <div className={classes.subtitleblock}>
                <h2 className={`h2 ${classes.subtitle}`}>
                  {titlebox ? titlebox : ''}
                </h2>
                {body && <RichText value={body} />}
              </div>

              <div className={classes.btngroup}>
                <Button href='tel:+33629653512' target='_self'>
                  <span>{contactContent[locale].call}</span>
                  <PhoneIcon className={classes.phone} />
                </Button>

                <div className={classes.googlemap}>
                  <Button
                    href='https://www.google.com/maps/place/Ouaknine+Alice+Avocat/@48.876648,2.3255411,14.2z/data=!4m5!3m4!1s0x0:0x51a276d4dfa05806!8m2!3d48.8775684!4d2.316890'
                    target='_blank'
                  >
                    <span>{contactContent[locale].google}</span>
                    <Image
                      src={googlePin}
                      width={5.12 * 3}
                      height={7.34 * 3}
                      alt={googlePin}
                    />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.rightblock}>
            <a
              href='https://www.google.com/maps/place/Ouaknine+Alice+Avocat/@48.876648,2.3255411,14.2z/data=!4m5!3m4!1s0x0:0x51a276d4dfa05806!8m2!3d48.8775684!4d2.316890'
              target='_blank'
              rel='noreferrer'
            >
              <Image
                src={mapImage}
                alt='Map'
                width={680.72}
                height={540.14}
                objectFit={'cover'}
              />
            </a>
          </div>
        </div>
      </section>

      <div className={classes.separator}></div>
      <section className={classes.container}>
        <Form titleform={titleform && titleform} subform={subform && subform} />
      </section>
    </div>
  );
}

export async function getStaticProps(ctx) {
  const locale = ctx.locale;

  try {
    const content = await clientApi.fetch(
      `*[_type == "contact" && language == "${locale}"]{
        titleseo,
        descriptionseo,
        title,
        subtitle,
        white,
        "imageTitleUrl": imageTitle.asset->url,
        "imageTitleAlt" : imageTitle.alt,
        "imgRatioTitle" : imageTitle.asset->metadata.dimensions.aspectRatio,
        "lqipTitle": imageTitle.asset->metadata.lqip,
        titlebox,
        titleform,
        body,
        subform
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

export default Contact;
