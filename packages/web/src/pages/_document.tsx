import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />

        {/* Icons */}
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png" />

        {/* Open Graph tags */}
        <meta property="og:site_name" content="imari" />
        <meta property="og:title" content="Imari: A Discord Clone" />
        <meta
          property="og:description"
          content="A simple messaging app designed to be a discord clone"
        />
        <meta property="og:image" content="https://imari.com/favicon-32x32.png" />
        <meta property="og:width" content="486" />
        <meta property="og:height" content="243" />
        <meta property="og:url" content="https://imari.com" />
        <meta property="og:site_name" content="Mihir Patel" />
        <meta property="og:type" content="website" />

        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans&family=Varela+Round&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
