import Head from 'next/head';
import { useRouter } from 'next/router';
import useLocale from '../../hooks/useLocale';
//import CONTENT from '../../content/headContent';

function HeadBase(props) {
  const CONTENT = props.seo
  const locale = useLocale();
  const { pathname, locales } = useRouter();

  //title - up to 50-60 characters long
  //description up to 150-160 characters

  return (
    <Head>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name='author' content='Alice Ouaknine'></meta>
      <title>{CONTENT ? CONTENT.title : CONTENT_BACKUP[locale].title}</title>
  
      <meta name='description' content={CONTENT ? CONTENT.description : CONTENT_BACKUP[locale].description} />

      <meta
        property='og:image'
        content='https://ia.media-imdb.com/images/rock.jpg'
      />
      <meta property='og:image:alt' content={CONTENT ? CONTENT.title : CONTENT_BACKUP[locale].title} />

      <meta name='twitter:image' content='LINK TO IMAGE' />
      <meta name='twitter:site' content='@USERNAME' />
      <meta name='twitter:creator' content='@USERNAME' />

      <link rel='canonical' href={process.env.NEXT_PUBLIC_HOST} />

      <link rel='icon' href='/favicon.ico' />
    </Head>
  );
}

export default HeadBase;
