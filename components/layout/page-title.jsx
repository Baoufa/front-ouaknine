import Image from 'next/image';
import Button from '../ui/button';

import classes from './page-title.module.scss';

import img from '../../public/images/green.jpeg';

export default function PageTitle({
  title,
  subtitle,
  btn,
  label1,
  label2,
  onClick1,
  onClick2,
  imgUrl,
  imgAlt,
  imgRatio,
  imgLqip,
}) {
  return (
    <div className={classes.titlegroup}>
      <div className={classes.titlegroupinner}>
        <div className={classes.left}>
          <h1 className={classes.title}>{title ? title : ''}</h1>
          <p className={classes.subtitle}>{subtitle ? subtitle : ''}</p>
        </div>

        {btn && (
          <div className={classes.right}>
            {label1 && (
              <Button outline={true} onClick={onClick1}>
                {label1}
              </Button>
            )}
            {label2 && (
              <Button outline={true} onClick={onClick2}>
                Phases d intervention
              </Button>
            )}
          </div>
        )}
      </div>

      <Image
        className={classes.img}
        src={imgUrl ? imgUrl : img}
        alt={imgAlt ? imgAlt : 'Background image'}
        objectFit={'cover'}
        layout={'fill'}
        objectPosition={'top'}
        blurDataURL={imgUrl ? imgLqip : ''}
        placeholder={'empty'}
        priority
        sizes='100vw'
        quality={30}
      />

      <div className={classes.overlay}></div>
    </div>
  );
}