import RichText from '../components/ui/rich-text';
import clientApi from '../libs/clientApi';
import classes from './legal.module.scss';
import useLocale from '../hooks/useLocale';

import CONTENT from '../content/legalContent.json'

import { useContext } from 'react';
import { CookieContextSchema } from '../context/cookie-context';

function Legal({ data }) {
  const { isAccepted, toggleCookie } = useContext(CookieContextSchema);
  const locale = useLocale()

  return (
    <section className={classes.container}>
      {data?.title && <h1>{data?.title}</h1>}
      {data?.block && <RichText value={data.block} />}


      <form className={classes.cookie}>
        <label htmlFor='cookie' className={classes.label}>{CONTENT[locale].label}</label>
        <input
          id='cookie'
          type='checkbox'
          checked={isAccepted}
          onClick={() => toggleCookie(isAccepted)}
        />
      </form>
     
    </section>
  );
}

export async function getStaticProps(ctx) {
  const locale = ctx.locale;

  try {
    const content = await clientApi.fetch(
      `*[_type == "legal" && language == "${locale}"]`
    );
    return { props: { data: content?.length && content[0] } };
  } catch (err) {
    console.log(err.message);
    return {
      notFound: true,
    }
  }
}

export default Legal;
