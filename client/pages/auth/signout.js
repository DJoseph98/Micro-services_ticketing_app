import { useEffect } from "react";
import { useRequest } from "../../hook/use-request";
import Router from "next/router";

const signout = () => {
  const { doRequest } = useRequest({
    url: "/api/users/signout",
    method: "post",
    body: {},
    onSuccess: () => Router.push("/"), //callback function after success
  });

  useEffect(() => {
    doRequest();
  }, []);

  return <div>Sign out...</div>;
};

export default signout;
