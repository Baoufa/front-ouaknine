import Image from 'next/image';

import clientApi from '../../libs/clientApi';

import RichText from '../../components/ui/rich-text';

import classes from './_id.module.scss';

function Article({ data }) {
  const {
    _id,
    author,
    publishedAt,
    title,
    slug,
    body,
    numberOfCharacters,
    estimatedWordCount,
    estimatedReadingTime,
    mainImage,
  } = data;

  return (
    <section className={classes.container}>
      <article className={classes.article}>
        {title && <h1>{title}</h1>}
        {author && <p>{author}</p>}
        {mainImage && (
          <Image
            className={classes.img}
            src={mainImage?.url ? `${mainImage?.url}?w=1600` : ''}
            alt={title ? title : 'Image article'}
            width={100}
            height={100}
            blurDataURL={
              mainImage?.metadata?.lqip ? mainImage?.metadata?.lqip : null
            }
            placeholder={'blur'}
            sizes='100vw'
            priority
            quality={30}
          />
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

    return { props: { data: content?.length && content[0] }, revalidate: 10  };
  } catch (err) {
    return {
      notFound: true,
    };
  }
}

export default Article;
