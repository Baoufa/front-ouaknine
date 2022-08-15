import App from 'next/app';
import NavContext from '../context/nav-context';
import Layout from '../components/layout/layout';
import clientApi from '../libs/clientApi';
import '../styles/globals.scss';
import '../styles/logo.scss';
import '../styles/font.css';

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
    const seoArray = await clientApi.fetch(`*[_type == "seo" && language == "${locale}"]`);
    const seo = seoArray[0];
    return { ...appProps, pageProps: { seo } };
  } catch (err) {
    console.log(err.message);
    return { ...appProps, pageProps: null };
  }
};

export default MyApp;
