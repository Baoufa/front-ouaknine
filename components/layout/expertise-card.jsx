import { useState, useRef } from 'react';
import useClickOutside from '../../hooks/usePercentView';
import useLocale from '../../hooks/useLocale';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowSmRightIcon } from '@heroicons/react/outline';
import { useInView } from 'react-intersection-observer';
import RichText from '../../components/ui/rich-text';

import { ShareIcon } from '@heroicons/react/outline';
import Share from './articles/share';

import classes from './expertise-card.module.scss';

function ExpertiseCard({
  imgUrl,
  blurDataURL,
  title,
  description,
  linkLabel,
  isAnimated,
  index,
  length,
}) {
  const locale = useLocale();
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0.3,
    triggerOnce: true,
  });

  const shareRef = useRef();
  const [shareOn, setShareOn] = useState(false);

  const toggleShare = () => {
    setShareOn(bol => !bol);
  };
  useClickOutside(shareOn, setShareOn, shareRef);

  return (
    <li
      className={`${classes.speouter} ${isAnimated && classes.isHidden} ${
        inView && isAnimated && classes.itemactive
      } `}
      ref={ref}
    >
      <div className={classes.spe}>
        <div className={classes.spe_top}>
          {blurDataURL && (
            <Image
              src={imgUrl}
              alt={'alt'}
              objectFit={'cover'}
              layout={'fill'}
              objectPosition={'center'}
              blurDataURL={blurDataURL}
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
            {title && <h3 className={classes.spe_title}>{title}</h3>}
            {description && <RichText value={description} />}
          </div>

          <div className={classes.lowerbar}>
            <button
              className={classes.sharegroup}
              ref={shareRef}
              onClick={toggleShare}
              onBlur={toggleShare}
            >
              <p className={classes.label}>Partager</p>
              <ShareIcon className={classes.share} />
              {shareOn && (
                <Share
                  url={`${process.env.NEXT_PUBLIC_HOST}/${locale}/article`}
                />
              )}
            </button>

            <div className={classes.spe_linkcontainer}>
              <Link href='/contact'>
                <a className={classes.spe_link}>
                  <span>{linkLabel}</span>
                  <ArrowSmRightIcon className={classes.arrowlink} />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {index !== length - 1 && <div className={classes.separator}></div>}
    </li>
  );
}

export default ExpertiseCard;
