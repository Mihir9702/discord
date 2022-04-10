import type { AppProps } from "next/app";
import { createClient, Provider } from "urql";
import "../styles/globals.css";
import Head from "next/head";

const client = createClient({
  url: "http://localhost:3000/graphql",
  fetchOptions: {
    credentials: "include",
  },
});

export default ({ Component, pageProps }: AppProps) => {
  return (
    <Provider value={client}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
};
