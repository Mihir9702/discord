import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Loader from "src/components/Loader";
import { useMe } from "src/utils/useMe";

export default () => {
  const router = useRouter();
  const { me, loading } = useMe();

  useEffect(() => {
    if (!loading) router.replace(me ? "/@me" : "/login");
  }, [loading, me]);

  return <Loader />;
};
