import { useRef, useState } from 'react';

import clientApi from '../../libs/clientApi';
import RichText from '../../components/ui/rich-text';
import classes from './_id.module.scss';

import useLocale from '../../hooks/useLocale';
import CONTENT from '../../content/articleCardContent.json';
import useClickOutside from '../../hooks/useClickoutside';

import { ShareIcon, ClockIcon, ArrowLeftIcon } from '@heroicons/react/outline';
import Share from '../../components/layout/articles/share';
import SanityImage from '../../components/ui/sanityImage';
import { useRouter } from 'next/router';
import useEventListener from '../../hooks/useEventListener';


const localSwitcher = (locale) => {
  if(locale === 'fr'){
    return 'en';
  }
  if (locale === 'en'){
    return 'fr';
  }
}

function Article({ data }) {
  const { _id, author, source, title, titleOther, body, bodyOther, estimatedReadingTime, estimatedReadingTimeOther, mainImage } =
    data;

  const [winWidth, setWinWidth] = useState();

  const widthHandler = () => {

    setWinWidth(globalThis.innerWidth);
    console.log(globalThis.innerWidth)
  };

  useEventListener('resize', widthHandler);

  const locale = useLocale();
  const shareRef = useRef();
  const [shareOn, setShareOn] = useState(false);
  const toggleShare = () => {
    setShareOn(bol => !bol);
  };

  const router = useRouter();

  const backHandler = () => {
    router.push('/articles');
  };

  useClickOutside(shareOn, setShareOn, shareRef);

  return (
    <section className={classes.container}>
      <button className={classes.backbtn} onClick={backHandler}>
        <ArrowLeftIcon
          className={classes.back}
          alt={'back - retour'}
          aria-label={'back - retour'}
        />
      </button>
      <article className={classes.article}>
        <div className={classes.titlegroupouter}>
          <div className={classes.titlegroup}>
            {(title || titleOther) && (<h1 className={classes.title}>{title ? title : titleOther}</h1>)}
          </div>

          <div className={classes.sub}>
            <div>
              {author && (
                <p className={classes.author}>
                  {CONTENT[locale].author + author}
                </p>
              )}
              {source && (
                <p>
                  Source :{' '}
                  <a
                    className={classes.link}
                    href={source}
                    target='_blank'
                    rel='noreferrer'
                  >
                    {CONTENT[locale].source}
                  </a>
                </p>
              )}
            </div>
            <div className={classes.actiongroup}>
              <div className={classes.readtime}>
                <ClockIcon className={classes.clock} />
                {locale === 'fr' && (
                  <p>
                    {`${CONTENT[locale].read} - ${title ? estimatedReadingTime : estimatedReadingTimeOther } min`}
                  </p>
                )}
                {locale === 'en' && (
                  <p>{`${ title ? estimatedReadingTime : estimatedReadingTimeOther } mn - ${CONTENT[locale].read}`}</p>
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
                    dir={winWidth < 769 ? 'right' : 'left'}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={classes.separator}></div>
        <div className={classes.content}>
          {mainImage && (
            <div className={classes.img}>
              <SanityImage asset={mainImage} />
            </div>
          )}
          <div>{(title || titleOther) && (<RichText value={title ? body : bodyOther} />)}</div>
        </div>
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
      "titleOther": content${localSwitcher(locale)}.title${localSwitcher(locale)},
      "slugOther": content${localSwitcher(locale)}.slug${localSwitcher(locale)},
      "bodyOther": content${localSwitcher(locale)}.body${localSwitcher(locale)},
      "numberOfCharacters": length(pt::text(content${locale}.body${locale})),
      "estimatedWordCount": round(length(pt::text(content${locale}.body${locale})) / 5),
      "estimatedReadingTime": round(length(pt::text(content${locale}.body${locale})) / 5 / 180 ),
      "numberOfCharactersOther": length(pt::text(content${localSwitcher(locale)}.body${localSwitcher(locale)})),
      "estimatedWordCountOther": round(length(pt::text(content${localSwitcher(locale)}.body${localSwitcher(locale)})) / 5),
      "estimatedReadingTimeOther": round(length(pt::text(content${localSwitcher(locale)}.body${localSwitcher(locale)})) / 5 / 180 ),
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
