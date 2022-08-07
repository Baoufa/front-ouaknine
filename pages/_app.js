import App from 'next/app';
import NavContext from '../context/nav-context';
import Layout from '../components/layout/layout';
import { fetchAPI } from '../libs/api';
import CONTENT_BACKUP from '../content/headerContent.json';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <NavContext>
      <Layout seo={pageProps.seo} navlinks={pageProps.navLinks}>
        <Component {...pageProps} />
      </Layout>
    </NavContext>
  );
}

MyApp.getInitialProps = async appContext => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
  const locale = appContext.ctx.locale;

  try {
    const seoRes = await fetchAPI('/seo', { locale });
    const seo = seoRes.data.data.attributes;
    const navRes = await fetchAPI('/nav-links', { locale });
    const navLinks = navRes.data.data;

    return { ...appProps, pageProps: { seo, navLinks } };
  } catch (err) {
    const seo = CONTENT_BACKUP[locale];
    return { ...appProps, pageProps: { seo } };
  }
};

export default MyApp;
