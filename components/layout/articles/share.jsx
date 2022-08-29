import classes from './share.module.scss';
import useLocale from '../../../hooks/useLocale';
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';

import CONTENT from '../../../content/shareContent.json'

import {FaFacebookF, FaTwitter,FaLinkedinIn, FaEnvelope} from 'react-icons/fa'
import { RiWhatsappFill} from "react-icons/ri";

const COLOR = '#f4f4f5';
const FILL = '#a1a1aa';

function Share({title, url, dir}) {

  const locale = useLocale();

  return (
    <div className={`${classes.container} ${dir === 'left' && classes.left} ${dir === 'right' && classes.right}`}>
      <p className={classes.label}>{CONTENT[locale].label}</p>
      <div className={classes.icongroup}>
        <FacebookShareButton url={url}>
          <FaFacebookF className={classes.icon}/>
        </FacebookShareButton>

        <TwitterShareButton url={url}>
          <FaTwitter className={classes.icon}/>
        </TwitterShareButton>

        <WhatsappShareButton url={url}>
         <RiWhatsappFill className={classes.icon}/>
        </WhatsappShareButton>

        <LinkedinShareButton url={url}>
         <FaLinkedinIn className={classes.icon}/>
        </LinkedinShareButton>

        <EmailShareButton url={url}>
          <FaEnvelope className={classes.icon}/>
        </EmailShareButton>
      </div>
    </div>
  );
}

export default Share;
