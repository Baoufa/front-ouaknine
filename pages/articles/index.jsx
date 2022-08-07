import classes from './articles.module.scss';
import ArticleCard from '../../components/layout/articles/article-card';

function Articles() {
  return (
    <div>
      <h1 className={classes.title}>Articles</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa dolorum
        molestiae dolores aliquam est ab nihil repellendus fugit quibusdam
        sapiente quod libero in impedit modi, neque error suscipit qui minima?
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis ut
        praesentium nemo rem. Dignissimos officiis, veritatis debitis sequi,
        dolorem nostrum quaerat impedit ipsum culpa, laudantium distinctio
        asperiores quis quidem velit.
      </p>

      <div>Filter</div>
      <ul className={classes.list}>
       <ArticleCard />
       <ArticleCard />
       <ArticleCard />
       <ArticleCard />
       <ArticleCard />
      </ul>
    </div>
  );
}

export async function getStaticProps(ctx) {
  return {
    props: {
      data: null,
    },
  };
}

export default Articles;
