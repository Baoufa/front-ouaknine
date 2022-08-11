import App from 'next/app';
import NavContext from '../context/nav-context';
import Layout from '../components/layout/layout';
import clientApi from '../libs/clientApi';
import '../styles/globals.scss';
import '../styles/logo.scss';

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
    const navLinksArray = await clientApi.fetch(`*[_type == "navlink"]{link[]->{link, en, fr}}`);
    const seoArray = await clientApi.fetch(`*[_type == "seo" && language == "${locale}"]`);
    const navLinks = navLinksArray[0].link;
    const seo = seoArray[0];
    return { ...appProps, pageProps: { navLinks, seo } };
  } catch (err) {
    console.log(err.message);
    return { ...appProps, pageProps: null };
  }
};

export default MyApp;
