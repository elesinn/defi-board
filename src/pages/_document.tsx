import Document, { Html, Head, Main, NextScript } from 'next/document';

import { AppConfig } from '../utils/AppConfig';
// background-image
// Need to create a custom _document because i18n support is not compatible with `next export`.
class MyDocument extends Document {
  render() {
    return (
      <Html lang={AppConfig.locale} className="h-full dark">
        <Head>
          <title>{AppConfig.title}</title>
          <meta name="description" content={AppConfig.description} />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter&display=optional"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/tw-elements/dist/css/index.min.css"
          />
        </Head>
        <body
          className="h-full bg-fixed bg-no-repeat"
          style={{
            backgroundColor: '#8EC5FC',
            backgroundImage: 'linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)',
          }}
        >
          <Main />

          <NextScript />
          {/* Resolving problem with tw-elements import */}
          {/* eslint-disable-next-line @next/next/no-sync-scripts */}
          <script src="https://cdn.jsdelivr.net/npm/tw-elements/dist/js/index.min.js"></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
