import classes from './article-card.module.scss';
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
  filter,
  publishedAt,
  body,
  estimatedReadingTime,
  mainImage,
  index,
}) {

  const locale = useLocale();
  const { pathname } = useRouter();



  const [viewed, setViewed] = useState(false);
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0.1,
  });

  const shareRef = useRef();
  const [shareOn, setShareOn] = useState(false);
  const toggleShare = () => {
    setShareOn(bol => !bol);
  };
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
      <div className={classes.separator}></div>
      <article
        ref={ref}
        className={`${index > 0 && classes.item} ${
          viewed && index > 0 && classes.itemactive
        }`}
      >
        <div className={classes.article}>
          <div className={classes.img}>
            <ActicleCardImg asset={mainImage} />
          </div>

          <div className={classes.description}>
            <Link href={`/articles/${_id}`}>
              <a className={classes.upper}>
                <div className={classes.topsub}>
               
                  {formattedDate && (
                    <p className={classes.date}>{`${formattedDate} - ${
                      CONTENT[locale][`${filter}Single`]
                    }`}</p>
                  )}
                   {/* {!isAvail && <div className={classes.only}>{CONTENT[locale].only}</div>} */}
                </div>
                {title && <h2 className={classes.title}>{title}</h2>}
                {body && (
                  <p className={classes.content}>
                    {body?.map(item => item?.children[0]?.text).join(' ')}
                  </p>
                )}
              </a>
            </Link>
            <div className={classes.lower}>
              <div className={classes.readtime}>
                <ClockIcon className={classes.clock} />
                {locale === 'fr' && (
                  <p>
                    {CONTENT[locale].read +
                      ' - ' +
                      estimatedReadingTime +
                      ' min'}
                  </p>
                )}
                {locale === 'en' && (
                  <p>{estimatedReadingTime + 'mn - ' + CONTENT[locale].read}</p>
                )}
              </div>
              <div className={classes.sharegroup}>
                <ShareIcon
                  className={classes.share}
                  onClick={toggleShare}
                  onBlur={toggleShare}
                  ref={shareRef}
                />
                {shareOn && (
                  <Share
                    url={`${process.env.NEXT_PUBLIC_HOST}/${locale}/article/${_id}`}
                    dir='right'
                    title={`Alice Ouaknine - ${title}`}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </article>
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
