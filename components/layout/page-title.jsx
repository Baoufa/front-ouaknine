import Image from 'next/image';
import Button from '../ui/button';

import classes from './page-title.module.scss';

import img from '../../public/images/green.jpeg';

export default function PageTitle({
  title,
  imgUrl,
  imgAlt,
  imgLqip,
  white,
  position,
}) {
  return (
    <div className={classes.titlegroup}>
      <div className={classes.titlegroupinner}>
        <div className={`${classes.left} ${!white && classes.black}`}>
          <h1 className={classes.title}>{title ? title : ''}</h1>
        </div>
      </div>

      {imgUrl && <Image
        className={classes.img}
        src={imgUrl ? imgUrl : img}
        alt={imgAlt ? imgAlt : 'Background image'}
        objectFit={'cover'}
        layout={'fill'}
        objectPosition={position}
        blurDataURL={imgUrl ? imgLqip : ''}
        placeholder={'empty'}
        priority
        sizes='100vw'
        quality={75}
      />}

      <div className={classes.overlay}></div>
    </div>
  );
}
