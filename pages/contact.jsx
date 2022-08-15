import classes from './contact.module.scss';
import Form from '../components/ui/form/form';

import RichText from '../components/ui/rich-text';
import contactContent from '../content/contactContent.json'

import useLocale from '../hooks/useLocale';
import clientApi from '../libs/clientApi';
import Image from 'next/image';
import mapImage from '../public/images/map.svg';
import googlePin from '../public/images/googlemaps_icon.svg';
import HeadPage from '../components/head/head-page';

import Button from '../components/ui/button';
import { PhoneIcon } from '@heroicons/react/solid';

function Contact({data}) {
  const {titleseo, descriptionseo, title, titlebox, titleform, body, subform } = data;
  const locale = useLocale();

  return (
    <div className={classes.container}>
      <HeadPage title={titleseo} description={descriptionseo} />

      <h1 className={classes.title}>{title ? title : ''}</h1>
      <div className={classes.grid}>
        <div className={classes.leftblock}>
          <div className={classes.leftblockinner}>
            <div className={classes.subtitleblock}>

              <h2 className={`h2 ${classes.subtitle}`}>{titlebox ? titlebox : ''}</h2>
             {body && <RichText
                value={body}
              />}
              
            </div>


            <div className={classes.btngroup}>
              <Button href='tel:+33629653512' target='_self'>
                <span>{contactContent[locale].call}</span>
                <PhoneIcon className={classes.phone} />
              </Button>

              <div className={classes.googlemap}>
                <Button href='https://www.google.com/maps/dir//7+Rue+Augustin+Thierry,+75019+Paris/@48.8759627,2.3941898,17z/data=!4m9!4m8!1m0!1m5!1m1!1s0x47e66dbe2df4954d:0x2ac4a205246c4641!2m2!1d2.3941898!2d48.8759627!3e0'>
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
          <Image
            src={mapImage}
            alt='Map'
            width={680.72}
            height={540.14}
            objectFit={'cover'}
          />
        </div>
      </div>
      <div className={classes.separator}></div>
      <Form titleform={titleform && titleform} subform={subform && subform} />
    </div>
  );
}

export async function getStaticProps(ctx) {
  const locale = ctx.locale;

  try {


    const content = await clientApi.fetch(
      `*[_type == "contact" && language == "${locale}"]`
    );
    return { props: { data: content?.length && content[0] } };
  } catch (err) {
    console.log(err.message);
    return { props: { data: null } };
  }
}

export default Contact;
