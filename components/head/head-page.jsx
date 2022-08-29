import Head from 'next/head';
import { useRouter } from 'next/router';
import useLocale from '../../hooks/useLocale';
import metaimagefr from '../../public/images/metaimagefr.png';

function HeadPage(props) {
  const locale = useLocale();

  const { title, description } = props;
  const { pathname, locales } = useRouter();


  return (
    <Head>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='author' content='Alice Ouaknine'></meta>

      {locales.map((locale, index) => (
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

      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:type' content='website' />
      <meta
        property='og:url'
        content={`${process.env.NEXT_PUBLIC_HOST}${pathname}`}
      />
      <meta
        property='og:image'
        content={metaimagefr}
      />
      <meta property='og:image:alt' content={title} />

      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={metaimagefr} />
      <meta name='twitter:site' content='@USERNAME' />
      <meta name='twitter:creator' content='@USERNAME' />

      <link rel='canonical' href={process.env.NEXT_PUBLIC_HOST} />
      <link rel='icon' href='/favicon.ico' />
    </Head>
  );
}

export default HeadPage;
