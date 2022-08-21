import classes from './share.module.scss';
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';

import {FaFacebookF, FaTwitter,FaWhatsapp,FaLinkedinIn, FaEnvelope} from 'react-icons/fa'
import { RiWhatsappFill} from "react-icons/ri";

const COLOR = '#f4f4f5';
const FILL = '#a1a1aa';

function Share({title, url}) {
  return (
    <div className={`${classes.container}`}>
      <p>Partager sur</p>
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
