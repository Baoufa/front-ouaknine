import { useRef, useState } from 'react';

import Image from 'next/image';
import clientApi from '../../libs/clientApi';
import RichText from '../../components/ui/rich-text';
import classes from './_id.module.scss';

import useLocale from '../../hooks/useLocale';
import CONTENT from '../../content/articleCardContent.json';
import useClickOutside from '../../hooks/useClickoutside';

import { ShareIcon, ClockIcon } from '@heroicons/react/outline';
import Share from '../../components/layout/articles/share';
import SanityImage from '../../components/ui/sanityImage';

function Article({ data }) {
  const {
    _id,
    author,
    publishedAt,
    source,
    title,
    slug,
    body,
    numberOfCharacters,
    estimatedWordCount,
    estimatedReadingTime,
    mainImage,
  } = data;

  console.log(source)

  const locale = useLocale();

  const shareRef = useRef();
  const [shareOn, setShareOn] = useState(false);
  const toggleShare = () => {
    setShareOn(bol => !bol);
  };

  useClickOutside(shareOn, setShareOn, shareRef);

  return (
    <section className={classes.container}>
      <article className={classes.article}>
      
      
        <div className={classes.titlegroup}>
          {title && <h1 className={classes.title}>{title}</h1>}

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
              />
            )}
          </div>
        </div>


          <div className={classes.readtime}>
            <ClockIcon className={classes.clock} />
            {locale === 'fr' && (
              <p>
                {CONTENT[locale].read + ' - ' + estimatedReadingTime + ' min'}
              </p>
            )}
            {locale === 'en' && (
              <p>{estimatedReadingTime + 'mn - ' + CONTENT[locale].read}</p>
            )}
          </div>


   
        {author && <p className={classes.author}>{CONTENT[locale].author + author}</p>}
        {/* {source && <p>Source : <a href={source}>{source}</a></p>} */}
        {mainImage && (
          <div className={classes.img}>
            <SanityImage asset={mainImage}/>
          </div>
        )}
        {body && <RichText value={body} />}
      </article>
    </section>
  );
}

export async function getStaticPaths({ locales }) {
  try {
    const posts = await clientApi.fetch(
      `*[_type == "post" 
      && dateTime(publishedAt) 
          < dateTime(now())] | order(publishedAt desc)
         {
      _id,
    }`
    );

    const paths = [];
    for (const locale of locales) {
      posts.map(post =>
        paths.push({ params: { _id: post._id }, locale: locale })
      );
    }

    return {
      paths: paths,
      fallback: false,
    };
  } catch (err) {
    console.log(err.message);
    return {
      paths: paths,
      fallback: false,
    };
  }
}

export async function getStaticProps({ locale, params }) {
  try {
    const _id = params._id;

    const content = await clientApi.fetch(
      `*[_id == "${_id}"]{
      _id,
      source,
      author,
      publishedAt,
      "title": content${locale}.title${locale},
      "slug": content${locale}.slug${locale},
      "body": content${locale}.body${locale},
      "numberOfCharacters": length(pt::text(content${locale}.body${locale})),
      "estimatedWordCount": round(length(pt::text(content${locale}.body${locale})) / 5),
      "estimatedReadingTime": round(length(pt::text(content${locale}.body${locale})) / 5 / 180 ),
      "mainImage":mainImage.asset->
    }`
    );

    if (content.length === 0) {
      return {
        redirect: {
          destination: '/articles',
          permanent: false,
          // statusCode: 301
        },
      };
    }

    return { props: { data: content?.length && content[0] }, revalidate: 10 };
  } catch (err) {
    return {
      notFound: true,
    };
  }
}

export default Article;
