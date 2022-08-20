import classes from './articles.module.scss';
import ArticleCard from '../../components/layout/articles/article-card';

import clientApi from '../../libs/clientApi';

function Articles({ data, posts }) {
  const { titleseo, descriptionseo, title, subtitle } = data;

  return (
    <section className={classes.container}>
      <div className={classes.titleblock}>
        {title && <h1 className={classes.title}>{title}</h1>}
        {subtitle && <p>{subtitle}</p>}
      </div>

      <ul className={classes.list}>
        {posts.map(post => {
          const { _id, author, publishedAt, title, slug, body, estimatedReadingTime } = post;

          return (
            <li key={_id}>
              <ArticleCard
                title={title}
                _id={_id}
                slug={slug?.current}
                author={author}
                publishedAt={publishedAt}
                body={body}
                estimatedReadingTime={estimatedReadingTime}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export async function getStaticProps(ctx) {
  const locale = ctx.locale;

  try {
    // const content = await clientApi.fetch(
    //   `*[_type in ["articles" && language == "${locale}]"]`
    // );
    const content = await clientApi.fetch(
      `*[_type == "articles" && language == "${locale}"]`
    );

    const posts = await clientApi.fetch(
      `*[_type == "post" 
      && dateTime(publishedAt) 
          < dateTime(now())
      && content${locale}.language == "${locale}"] | order(publishedAt desc)
         {
      _id,
      author,
      publishedAt,
      "title": content${locale}.title${locale},
      "slug": content${locale}.slug${locale},
      "body": content${locale}.body${locale},
      "numberOfCharacters": length(pt::text(content${locale}.body${locale})),
      "estimatedWordCount": round(length(pt::text(content${locale}.body${locale})) / 5),
      "estimatedReadingTime": round(length(pt::text(content${locale}.body${locale})) / 5 / 180 )
    }`
    );

    console.log(posts);
    return { props: { data: content?.length && content[0], posts: posts } };
  } catch (err) {
    console.log(err.message);
    return { props: { data: null } };
  }
}

export default Articles;
