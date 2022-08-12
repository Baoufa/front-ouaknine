import classes from './contact.module.scss';
import Form from '../components/ui/form/form';
import Link from 'next/link';
import Image from 'next/image';
import mapImage from '../public/images/map.svg';
import googlePin from '../public/images/googlemaps_icon.svg';

import Button from '../components/ui/form/button';
import { PhoneIcon } from '@heroicons/react/outline';

function Contact() {
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Contacter le Cabinet Ouaknine</h1>
      <div className={classes.grid}>
        <div className={classes.leftblock}>
          <div className={classes.leftblockinner}>
            <div className={classes.subtitleblock}>
              <h2 className={`h2 ${classes.subtitle}`}>Nos coordonnées</h2>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Similique voluptas sapiente cum, quo deserunt ab obcaecati
                laborum numquam, ipsam maxime laboriosam.
              </p>
            </div>

            <div className={classes.address}>
              <p>Maître Ouaknine</p>
              <p>7 Augustin Thierry</p>
              <div>
                <span>75019</span>
                <span> </span>
                <span>Paris</span>
                <span>, </span>
                <span>France</span>
              </div>
            </div>

            <div className={classes.address}>
              <div>
                <span>Tél: </span>
                <span>+33 (0)6 52 25 71 47</span>
              </div>
              <div>
                <span>Fax: </span>
                <span>+33 (0)6 52 25 71 47</span>
              </div>
            </div>
            <p>Le cabinet est ouvert de 9h à 17h de lundi au vendredi.</p>

            <Button href='tel:+33629653512"'>
              <span>Nous appeler </span>
              <PhoneIcon className={classes.phone}/>
            </Button>

            <div className={classes.googlemap}>
              <Button href='https://www.google.com/maps/dir//7+Rue+Augustin+Thierry,+75019+Paris/@48.8759627,2.3941898,17z/data=!4m9!4m8!1m0!1m5!1m1!1s0x47e66dbe2df4954d:0x2ac4a205246c4641!2m2!1d2.3941898!2d48.8759627!3e0'>
                <span>Ouvrir avec Google Map </span>
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
      <Form />
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

export default Contact;
