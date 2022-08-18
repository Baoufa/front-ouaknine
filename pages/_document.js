import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href='https://fonts.googleapis.com/css2?family=Cormorant:wght@100;200;300;400;500;700;900&family=Source+Serif+Pro:wght@300;400;700;900&display=swap'
            rel='stylesheet'
          />
          <link
            href='https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600;700&display=swap'
            rel='stylesheet'
          />
          <link rel="preload" href="https://use.typekit.net/fbc5oao.css" />
        </Head>
        <body>
          <div id='modal-root'></div>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
