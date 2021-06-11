import { useState } from "react";
import { useRequest } from "../../hook/use-request";
import Router from "next/router";
export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { doRequest, errors } = useRequest({
    url: "/api/users/signup",
    method: "post",
    body: {
      email,
      password,
      confirmPassword,
    },
    onSuccess: () => Router.push("/"), //callback function after success
  });

  const onSubmit = (event) => {
    event.preventDefault();
    doRequest();
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Signup Page</h1>
      <div className="form-group">
        <label>Email adress</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
          value={email}
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="form-control"
          value={password}
        />
      </div>
      <div className="form-group">
        <label>Confirm Password</label>
        <input
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          className="form-control"
          value={confirmPassword}
        />
      </div>
      {errors}
      <button className="btn btn-primary">Sign up</button>
    </form>
  );
};
