import { useState, useRef, useEffect } from 'react';
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
import { useRouter } from 'next/router';

function ExpertiseCard({
  _id,
  query,
  imgUrl,
  blurDataURL,
  title,
  description,
  right,
  linkLabel,
  isAnimated,
  index,
  length,
}) {
  const locale = useLocale();
  const router = useRouter();
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
     scrollTo(_id, 60);
    }
  };

  useEffect(() => {
    console.log("_query", query);

    if(query._id === _id){
     // console.log(query);
      setSeeMore(true);

      if(!seeMore){
       scrollTo(_id, 60);
      //  router.replace(`${router.pathname}/#${_id}`)
      //  router.replace(`${router.pathname}`)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])
  

  const animationCSS = `animation${index}`;
  const animationSepCSS = `animationsep${index}`;

  return (
    <li id={_id} className={`${classes.spe} ${!query?._id && classes[animationCSS]}`}>
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
        {right && (
          <div className={`${classes.spe_right}`}>
            <RichText value={right} />
          </div>
        )}

        <div className={classes.spe_lowerbar}>
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
