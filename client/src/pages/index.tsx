import React from "react";
import { useQuery } from "@apollo/client";
import { UserQuery, UserDocument } from "src/graphql";
import { useRouter } from "next/router";
import Loader from "src/components/Loader";

// todo get state management

export default () => {
  const { data, loading } = useQuery<UserQuery>(UserDocument);

  if (loading) return <Loader />;
  else if (!data?.user) {
    useRouter().push("/login");
  } else if (data.user) {
    useRouter().push("/@me");
  }

  return <Loader />;
};
