import Head from 'next/head';
import { useRouter } from 'next/router';
import useLocale from '../../hooks/useLocale';
import CONTENT from '../../content/headContent';
import LOCALES from '../../content/i18n';

function HeadPage(props) {
  const locale = useLocale();
  const { pathname } = useRouter();

  //title - up to 50-60 characters long
  //description up to 150-160 characters

  return (
    <Head>
      <title>{CONTENT[locale].title}</title>
      <meta property='og:title' content={CONTENT[locale].title} />
      <meta name='description' content={CONTENT[locale].description} />
      <meta property='og:description' content={CONTENT[locale].description} />
      <meta property='og:type' content='website' />
      <meta
        property='og:url'
        content={`${process.env.NEXT_PUBLIC_HOST}${pathname}`}
      />
      <meta
        property='og:image'
        content='https://ia.media-imdb.com/images/rock.jpg'
      />
      <meta property='og:image:alt' content={CONTENT[locale].title} />
      
      {LOCALES.map((locale, index) => (
        <link
          key={index}
          rel='alternate'
          hrefLang={locale.toLowerCase()}
          href={`${
            process.env.NEXT_PUBLIC_HOST
          }/${locale.toLowerCase()}${pathname}`}
        />
      ))}
      <link
        rel='alternate'
        hrefLang='x-default'
        href={`${process.env.NEXT_PUBLIC_HOST}${pathname}`}
      />

      <meta name='twitter:title' content='TITLE OF POST OR PAGE' />
      <meta name='twitter:description' content='DESCRIPTION OF PAGE CONTENT' />
      <meta name='twitter:image' content='LINK TO IMAGE' />
      <meta name='twitter:site' content='@USERNAME' />
      <meta name='twitter:creator' content='@USERNAME' />

      <link rel='canonical' href='http://example.com/' />

      <link rel='icon' href='/favicon.ico' />
    </Head>
  );
}

export default HeadPage;
