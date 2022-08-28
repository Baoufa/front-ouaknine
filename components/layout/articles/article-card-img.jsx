import Image from 'next/image';

import { useNextSanityImage } from 'next-sanity-image';
import clientApi from '../../../libs/clientApi';

import classes from './article-card-img.module.scss';

function ActicleCardImg({ asset }) {
  const imageProps = useNextSanityImage(clientApi, asset);
  if (!imageProps) return null;

  return (
    <div className={classes.container}>
      <Image
        {...imageProps}
        alt='title'
        placeholder={'blur'}
        objectFit={'cover'}
        layout={'fill'}
        objectPosition={'center'}
      />
    </div>
  );
}

export default ActicleCardImg;
