import {useNextSanityImage} from 'next-sanity-image'
import Image from 'next/image';
import clientApi from '../../libs/clientApi';

const SanityImage = ({ asset }) => {
  const imageProps = useNextSanityImage(clientApi, asset);

  if (!imageProps) return null;

  // eslint-disable-next-line jsx-a11y/alt-text
  return (<Image 
    {...imageProps}
    layout='responsive'
    sizes='(max-width: 800px) 100vw, 800px'
  />);
}

export default SanityImage;