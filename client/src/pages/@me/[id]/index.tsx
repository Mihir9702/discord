import React from "react";
import { useQuery } from "@apollo/client";
import { UserQuery, UserDocument } from "src/graphql";
import { useRouter } from "next/router";
import Loader from "src/components/Loader";
import Layout from "src/components/Layout";
import { storage } from "src/utils/storage";

export default () => {
  const { data, loading } = useQuery<UserQuery>(UserDocument);
  const user = data?.user;

  if (loading) return <Loader />;
  else if (!user) {
    useRouter().push("/login");
  }

  storage(user?.nameId);

  return <Layout home={false} server={false} />;
};
