import { useState, useRef } from 'react';
import useClickOutside from '../../hooks/usePercentView';
import useLocale from '../../hooks/useLocale';

import scrollTo from '../../libs/scrollTo';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowSmRightIcon, ChevronDownIcon } from '@heroicons/react/outline';
import { ChevronUpIcon } from '@heroicons/react/solid';
import { useInView } from 'react-intersection-observer';
import RichText from '../../components/ui/rich-text';

import CONTENT from '../../content/expertiseContent.json';

import { ShareIcon } from '@heroicons/react/outline';
import Share from './articles/share';

import classes from './expertise-card.module.scss';

function ExpertiseCard({
  _id,
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

  const toggleSeeMore = () => {
    setSeeMore(bol => !bol);

    if(!seeMore){
      scrollTo(_id, 40);
    }
   
  };

  const animationCSS = `animation${index}`;
  const animationSepCSS = `animationsep${index}`;

  return (
    <li id={_id} className={`${classes.spe} ${classes[animationCSS]}`}>
      {title && (
        <div className={classes.spe_titlegroup} onClick={toggleSeeMore}>
          <ChevronDownIcon
            className={`${classes.spe_chevron} ${
              seeMore && classes.spe_chevronselected
            }`}
          />
          <div className={classes.spe_titleouter}>
            <h3 className={`${classes.spe_title}`}>{title}</h3>
            <div
              className={`${classes.spe_titlebar} ${
                seeMore && classes.spe_selected
              }`}
            ></div>
          </div>
        </div>
      )}

      <div className={`${classes.spe_lower} ${seeMore && classes.spe_show}`}>
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
      </div>
      {/* 
      {index !== length - 1 && <div className={classes.separator}></div>} */}
    </li>
  );
}

export default ExpertiseCard;
