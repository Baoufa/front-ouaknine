import { useState, useRef } from 'react';
import useClickOutside from '../../hooks/usePercentView';
import useLocale from '../../hooks/useLocale';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowSmRightIcon } from '@heroicons/react/outline';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
import { useInView } from 'react-intersection-observer';
import RichText from '../../components/ui/rich-text';

import CONTENT from '../../content/expertiseContent.json';

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
  const [seeMore, setSeeMore] = useState(false);

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0.3,
    triggerOnce: true,
    onChange: () => {
      if (!inView) {
        setSeeMore(false);
      }
    },
  });
  const {
    ref: ref2,
    inView: inView2,
    entry: entry2,
  } = useInView({
    /* Optional options */
    threshold: 0,
    onChange: () => {
      if (!inView2) {
        setSeeMore(false);
      }
    },
  });

  const shareRef = useRef();
  const [shareOn, setShareOn] = useState(false);

  const toggleShare = () => {
    setShareOn(bol => !bol);
  };
  useClickOutside(shareOn, setShareOn, shareRef);

  const toggleSeeMore = () => {
    setSeeMore(bol => !bol);
  };

  return (
    <li
      className={`${classes.spe} ${isAnimated && classes.isHidden} ${
        inView && isAnimated && classes.itemactive
      } `}
      ref={ref}
    >
      {title && <h3 className={classes.spe_title} onClick={toggleSeeMore}>{title}</h3>}

   {seeMore &&   <div className={`${classes.spe_lower}`}>
        {description && (
          <div className={`${classes.spe_description}`}>
            <RichText value={description} />
          </div>
        )}

        <div className={classes.lowerbar}>
          <div className={classes.spe_linkcontainer}>
            <Link href='/contact'>
              <a className={classes.spe_link}>
                <span>{linkLabel}</span>
                <ArrowSmRightIcon className={classes.arrowlink} />
              </a>
            </Link>
          </div>
        </div>
      </div>}
{/* 
      {index !== length - 1 && <div className={classes.separator}></div>} */}
    </li>
  );
}

export default ExpertiseCard;
