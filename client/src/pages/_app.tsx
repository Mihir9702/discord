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
        <title>Discord</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <SocketProvider>
        <Component {...pageProps} />
      </SocketProvider>
    </ApolloProvider>
  );
};
