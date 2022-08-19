import App from 'next/app';
import NavContext from '../context/nav-context';
import CookieContext from '../context/cookie-context';
import LoaderContext from '../context/loader-context';
import Layout from '../components/layout/layout';
import clientApi from '../libs/clientApi';
import '../styles/globals.scss';
import '../styles/logo.scss';
import '../styles/font.css';

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
