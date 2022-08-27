import { useEffect, useState } from 'react';

import classes from './articles.module.scss';
import ArticleCard from '../../components/layout/articles/article-card';
import { ChevronDownIcon } from '@heroicons/react/outline';

import clientApi from '../../libs/clientApi';
import CONTENT from '../../content/articleCardContent.json';
import useLocale from '../../hooks/useLocale';

import PageTitle from '../../components/layout/page-title';

function Articles({ data, posts }) {
  const {
    titleseo,
    descriptionseo,
    title,
    subtitle,
    imageTitleUrl,
    imageTitleAlt,
    imgRatioTitle,
    lqipTitle,
    white,
  } = data;
  const [filter, setFilter] = useState('all');
  const locale = useLocale();

  const [filteredPosts, setFilteredPosts] = useState([]);

  const selectHandler = e => {
    e.preventDefault();
    setFilter(e.target.value);
  };

  const filterHandler = (filter = 'all') => {
    if (filter !== 'all') {
      const filtered = posts.filter(item => {
        return item.filter == filter;
      });
      setFilteredPosts(filtered);
    } else setFilteredPosts(posts);
  };

  useEffect(() => {
    filterHandler(filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return (
    <div>
      <PageTitle
        title={title ? title : ''}
        subtitle={subtitle ? subtitle : ''}
        btn={false}
        imgUrl={imageTitleUrl ? `${imageTitleUrl}?w=1600` : null}
        imgAlt={imageTitleAlt ? imageTitleAlt : 'Background image'}
        imgRatio={imgRatioTitle ? imgRatioTitle : 1}
        imgLqip={lqipTitle ? lqipTitle : null}
        white={white ? white : true}
        position={'bottom'}
      />

      <section className={classes.container}>
        <div className={classes.titleblock}>
          {/* {title && <h1 className={classes.title}>{title}</h1>} */}
          {subtitle && <p className={classes.subtitle}>{subtitle}</p>}
          <form className={classes.filters}>
            <label
              className={classes.label}
              htmlFor='filter'
              aria-label={'Select articles type'}
            ></label>
            <div className={classes.selectwrapper}>
              <select
                className={classes.select}
                name='pets'
                id='filter'
                value={filter}
                onChange={selectHandler}
              >
                <option value='all'>{CONTENT[locale].all}</option>
                <option value='fact'>{CONTENT[locale].fact}</option>
                <option value='press'>{CONTENT[locale].press}</option>
              </select>
              <ChevronDownIcon className={classes.chevron} />
            </div>
          </form>
        </div>

        {filteredPosts.length > 0 && (
          <ul className={classes.list}>
            {filteredPosts.map((post, index) => {
              const {
                _id,
                author,
                filter,
                publishedAt,
                title,
                slug,
                body,
                estimatedReadingTime,
                mainImage,
              } = post;

              return (
                <li key={_id}>
                  <ArticleCard
                    index={index}
                    title={title}
                    _id={_id}
                    slug={slug?.current}
                    filter={filter}
                    author={author}
                    publishedAt={publishedAt}
                    body={body}
                    estimatedReadingTime={estimatedReadingTime}
                    mainImage={mainImage?.asset}
                  />
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}

export async function getStaticProps(ctx) {
  const locale = ctx.locale;

  try {
    // const content = await clientApi.fetch(
    //   `*[_type in ["articles" && language == "${locale}]"]`
    // );
    const content = await clientApi.fetch(
      `*[_type == "articles" && language == "${locale}"]{
        ...,
        "imageTitleUrl": imageTitle.asset->url,
        "imageTitleAlt" : imageTitle.alt,
        "imgRatioTitle" : imageTitle.asset->metadata.dimensions.aspectRatio,
        "lqipTitle": imageTitle.asset->metadata.lqip
      }`
    );

    const posts = await clientApi.fetch(
      `*[_type == "post" 
      && dateTime(publishedAt) 
          < dateTime(now())
      && content${locale}.language == "${locale}"] | order(publishedAt desc)
         {  
      mainImage,  
      _id,
      filter,
      author,
      ...,
      publishedAt,
      "title": content${locale}.title${locale},
      "slug": content${locale}.slug${locale},
      "body": content${locale}.body${locale},
      "numberOfCharacters": length(pt::text(content${locale}.body${locale})),
      "estimatedWordCount": round(length(pt::text(content${locale}.body${locale})) / 5),
      "estimatedReadingTime": round(length(pt::text(content${locale}.body${locale})) / 5 / 180 )
    }`
    );

    return {
      props: { data: content?.length && content[0], posts: posts },
      revalidate: 10,
    };
  } catch (err) {
    console.log(err.message);
    return {
      notFound: true,
    };
  }
}

export default Articles;
