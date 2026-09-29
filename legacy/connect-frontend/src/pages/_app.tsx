import type { AppProps } from "next/app";
import "src/styles/globals.css";
import client from "src/client";
import { ApolloProvider } from "@apollo/client";

export default ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};
