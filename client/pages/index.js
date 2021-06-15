import { buildClient } from "../api/build-client";

const HomePage = ({ currentUser }) => {
  console.log(currentUser);
  return <h1>Coucou2</h1>;
};

//function will be executing on server side
HomePage.getInitialProps = async (context) => {
  const { data } = await buildClient(context).get("/api/users/currentuser");
  return data;
};

export default HomePage;
