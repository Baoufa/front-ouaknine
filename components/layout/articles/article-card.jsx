import classes from './article-card.module.scss';
import Image from 'next/image';
import Link from 'next/link';

import { useEffect, useState } from 'react';

import useLocale from '../../../hooks/useLocale';
import { useInView } from 'react-intersection-observer';
import { ClockIcon, ShareIcon } from '@heroicons/react/outline';

import defaultImage from '../../../public/images/alex-vasey-tDuQe2ShHpk-unsplash.jpeg';

import CONTENT from '../../../content/articleCardContent.json';

function ArticleCard({
  _id,
  title,
  slug,
  author,
  publishedAt,
  body,
  estimatedReadingTime,
}) {
  const locale = useLocale();

  const [viewed, setViewed] = useState(false);
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

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

  const shareHandler = (title, slug) => {};

  return (
    <>
      <article
        ref={ref}
        className={`${classes.item} ${viewed && classes.itemactive}`}
      >
        <Link
          href={ `/articles/${_id}`}
        >
          <a className={classes.article}>
            <div className={classes.img}>
              <Image
                src={defaultImage}
                alt='title'
                width={250}
                height={250}
                placeholder={'blur'}
                objectFit={'cover'}
                layout={'responsive'}
                objectPosition={'center'}
              />
            </div>

            <div className={classes.description}>
              <div className={classes.upper}>
                {formattedDate && (
                  <p className={classes.date}>{formattedDate}</p>
                )}
                {title && <h2 className={classes.title}>{title}</h2>}
                {body && (
                  <p className={classes.content}>
                    {body[0]?.children[0]?.text}
                  </p>
                )}
              </div>
              <div className={classes.lower}>
                <div className={classes.readtime}>
                  <ClockIcon className={classes.clock} />
                  <p>{estimatedReadingTime + CONTENT[locale].read}</p>
                </div>
                <ShareIcon
                  className={classes.share}
                  onClick={() => shareHandler(title, slug)}
                />
              </div>
            </div>
          </a>
        </Link>
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
