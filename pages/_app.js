import NavContext from '../context/nav-context';
import CookieContext from '../context/cookie-context';
import LoaderContext from '../context/loader-context';
import Layout from '../components/layout/layout';
import '../styles/globals.scss';
import '../styles/logo.scss';
import '../styles/scale.scss';

function MyApp({ Component, pageProps }) {
  return (
    <CookieContext>
      <LoaderContext>
        <NavContext>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </NavContext>
      </LoaderContext>
    </CookieContext>
  );
}

export default MyApp;
