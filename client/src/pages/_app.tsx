import type { AppProps } from "next/app";
import Head from "next/head";
import "src/styles/globals.css";
import client from "src/client";
import { ApolloProvider } from "@apollo/client";
import { SocketProvider } from "src/utils/socket";

export default ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={client}>
      <Head>
        <title>Connect</title>
        <meta
          name="description"
          content="An independent educational chat-app clone."
        />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <SocketProvider>
        <Component {...pageProps} />
      </SocketProvider>
    </ApolloProvider>
  );
};
