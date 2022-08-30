import Image from 'next/image';

import { useNextSanityImage } from 'next-sanity-image';
import clientApi from '../../../libs/clientApi';

import classes from './article-card-img.module.scss';

const myCustomImageBuilder = (imageUrlBuilder, options) => {
  return imageUrlBuilder.width(
    // options.width || Math.min(options.originalImageDimensions.width, 250)
    500
  );
};

function ActicleCardImg({ asset }) {
  const imageProps = useNextSanityImage(clientApi, asset, {
    imageBuilder: myCustomImageBuilder,
  });
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
        sizes='(min-width: 769px) 33vw,
        90vw'
      />
    </div>
  );
}

export default ActicleCardImg;
