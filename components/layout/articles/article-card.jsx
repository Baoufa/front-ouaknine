import classes from './article-card.module.scss';
import Image from 'next/image';
import Link from 'next/link';

import useTimeout from '../../../hooks/useTimout';
import { useEffect, useState} from 'react';
import { useInView } from 'react-intersection-observer';
import { ClockIcon, ShareIcon } from '@heroicons/react/outline';

import defaultImage from '../../../public/images/alex-vasey-tDuQe2ShHpk-unsplash.jpeg';

function ArticleCard() {
  const [viewed, setViewed] = useState(false);
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0.2,
  });

  useEffect(() => {
    if(inView && !viewed){
      setViewed(true);
    }
  }, [inView, viewed])

  return (
    <li ref={ref} className={`${classes.item} ${viewed && classes.itemactive}`}>
      <article>
        <Link href='/articles'>
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
                <p className={classes.date}>25 juiller 2021</p>
                <h2 className={classes.title}>Article Title</h2>
                <p className={classes.content}>
                  {' '}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
                  dolorum molestiae dolores aliquam est ab nihil repellendus
                  fugit quibusdam sapiente quod libero in impedit modi, neque
                  error suscipit qui minima? Lorem ipsum, dolor sit amet
                  consectetur adipisicing elit. Facilis ut praesentium nemo rem.
                  Dignissimos officiis, veritatis debitis sequi, dolorem nostrum
                  quaerat impedit ipsum culpa, laudantium distinctio asperiores
                  quis quidem velit.
                </p>
              </div>
              <div className={classes.lower}>
                <div className={classes.readtime}>
                  <ClockIcon className={classes.clock} />
                  <p>3 min read</p>
                </div>
                <ShareIcon className={classes.share} />
              </div>
            </div>
          </a>
        </Link>
      </article>
      <div className={classes.separator}></div>
    </li>
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
