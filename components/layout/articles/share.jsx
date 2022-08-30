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

function Share({title, url, dir}) {

  const locale = useLocale();

  return (
    <div className={`${classes.container} ${dir === 'left' && classes.left} ${dir === 'right' && classes.right}`}>
      <p className={classes.label}>{CONTENT[locale].label}</p>
      <div className={classes.icongroup}>
        <FacebookShareButton url={url} quote={title}>
          <FaFacebookF className={classes.icon}/>
        </FacebookShareButton>

        <TwitterShareButton url={url} title={title}>
          <FaTwitter className={classes.icon} />
        </TwitterShareButton>

        <WhatsappShareButton url={url} title={title} separator={`\n`}>
         <RiWhatsappFill className={classes.icon}/>
        </WhatsappShareButton>

        <LinkedinShareButton url={url} title={title} source={process.env.NEXT_PUBLIC_HOST}>
         <FaLinkedinIn className={classes.icon}/>
        </LinkedinShareButton>

        <EmailShareButton url={url} subject={title} body={title} separator={`\n`}>
          <FaEnvelope className={classes.icon}/>
        </EmailShareButton>
      </div>
    </div>
  );
}

export default Share;
