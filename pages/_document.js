import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href='https://fonts.googleapis.com/css2?family=Cormorant:wght@300;400;500;700&display=swap'
            rel='stylesheet'
          />
          <link
            href='https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;500;700&display=swap'
            rel='stylesheet'
          />
          <link rel='stylesheet' href="https://use.typekit.net/fbc5oao.css" />
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
