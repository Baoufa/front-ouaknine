import classes from './main-footer.module.scss';
import Link from 'next/link';
import LogoSquare from '../../../public/images/logosquare.svg';
import Image from 'next/image';

import { FaLinkedin, FaGooglePlusSquare } from 'react-icons/fa';

function MainFooter() {
  return (
    <footer className={classes.footer}>
      <div className={classes.innercontainer}>
          <Image className={classes.logo} src={LogoSquare} alt={'logo'} width={70} height={38.73} layout={'fixed'}/>
     
        <div className={classes.links}>
          <p>Cabinet Ouaknine</p>
          <span>|</span>
          <Link href='/legal'>Mentions légales</Link>
          <span>|</span>
          <p>Admin</p>
        </div>

        <p className={classes.address}>
          {
            '7 rue Augustin Thierry, 75019 Paris, France\nTel: +33 (0)6 52 25 71 47\nFax: +33 (0)6 52 25 71 47'
          }
        </p>

        <div className={classes.social}>
          <a
            href=' https://fr.linkedin.com/in/alice-ouaknine-23a4186b'
            target='_blank'
            rel='noreferrer'
            alt='LinkedIn Alice Ouaknine'
            aria-label="Open LinkedIn Alice Ouaknine"
          >
            <FaLinkedin
              className={classes.socialicon}
              alt='Google Alice Ouaknine'
            />
          </a>
          <a
            href='https://www.google.com/maps/place/Ouaknine+Alice+Avocat/@48.8775684,2.3168902,15z/data=!4m5!3m4!1s0x0:0x51a276d4dfa05806!8m2!3d48.8775684!4d2.3168902'
            target='_blank'
            rel='noreferrer'
            alt='Google Alice Ouaknine'
            aria-label="Open Google Alice Ouaknine"
          >
            <FaGooglePlusSquare
              className={classes.socialicon}
              alt='Google Alice Ouaknine'
            />
          </a>
        </div>
        <div className={classes.credit}></div>
      </div>

      <a
        href='https://www.linkedin.com/in/benjamin-anoufa/'
        target='_blank'
        rel='noreferrer'
        className={classes.design}
      >
        Website by Benjamin Anoufa
      </a>
    </footer>
  );
}

export default MainFooter;
