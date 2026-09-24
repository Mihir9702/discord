import React from "react";
import Loader from "src/components/Loader";
import Layout from "src/components/Layout";
import { useRequireMe } from "src/utils/useMe";

// friends
export default () => {
  const { me } = useRequireMe();

  if (!me) return <Loader />;

  return <Layout home={true} server={false} />;
};
