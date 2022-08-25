import classes from './article-card.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import Share from './share';
import { useRef } from 'react';

import useClickOutside from '../../../hooks/useClickoutside';

import ActicleCardImg from './article-card-img';

import { useEffect, useState } from 'react';

import useLocale from '../../../hooks/useLocale';
import { useInView } from 'react-intersection-observer';
import { ClockIcon, ShareIcon } from '@heroicons/react/outline';

import { useRouter } from 'next/router';

import CONTENT from '../../../content/articleCardContent.json';

function ArticleCard({
  _id,
  title,
  slug,
  author,
  publishedAt,
  body,
  estimatedReadingTime,
  mainImage,
}) {
  const locale = useLocale();
  const {pathname} = useRouter()

  const [viewed, setViewed] = useState(false);
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  const shareRef = useRef();
  const [shareOn, setShareOn] = useState(false);
  const toggleShare = () => {
    setShareOn(bol => !bol);
  }
  useClickOutside(shareOn, setShareOn, shareRef);

  
  useEffect(() => {
    if (inView && !viewed) {
      setViewed(true);
    }
  }, [inView, viewed]);
  
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  
  let formattedDate;
  if (publishedAt) {
    formattedDate = new Date(publishedAt).toLocaleDateString(locale, options);
  }
  


  return (
    <>
      <article
        ref={ref}
        className={`${classes.item} ${viewed && classes.itemactive}`}
      >
     
          <div className={classes.article}>
            <div className={classes.img}>
              <ActicleCardImg asset={mainImage} />
            </div>

            <div className={classes.description}>
              <Link  href={`/articles/${_id}`}>
                <a className={classes.upper}>
                {formattedDate && (
                  <p className={classes.date}>{formattedDate}</p>
                )}
                {title && <h2 className={classes.title}>{title}</h2>}
                {body && (
                  <p className={classes.content}>
                    {body[0]?.children[0]?.text}
                  </p>
                )}

                </a>
             
              </Link>
              <div className={classes.lower}>
                <div className={classes.readtime}>
                  <ClockIcon className={classes.clock} />
                  {locale === 'fr' && <p>{CONTENT[locale].read + ' - ' + estimatedReadingTime + ' min'}</p>}
                  {locale === 'en' && <p>{estimatedReadingTime + 'mn - ' +  CONTENT[locale].read}</p>}
                </div>
                <div className={classes.sharegroup}>
                <ShareIcon
                  className={classes.share}
                  onClick={toggleShare}
                  onBlur={toggleShare}
                  ref={shareRef}
                />
                { shareOn && <Share url={`${process.env.NEXT_PUBLIC_HOST}/${locale}/article/${_id}`} dir='right' />}
                </div>
               

              </div>
            </div>
          </div>
     
      </article>
      <div className={classes.separator}></div>
    </>
  );
}

export async function getStaticProps(ctx) {
  return {
    props: {
      data: null,
    },
  };
}

export default ArticleCard;
