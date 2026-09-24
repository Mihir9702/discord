import React from "react";
import Loader from "src/components/Loader";
import Layout from "src/components/Layout";
import { useRequireMe } from "src/utils/useMe";

// /@me/[channelId] - direct messages
export default () => {
  const { me } = useRequireMe();

  if (!me) return <Loader />;

  return <Layout home={false} server={false} />;
};
