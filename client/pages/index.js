import axios from "axios"; //we don't use here the request hook created because hook is only for react component

const HomePage = ({ currentUser }) => {
  console.log(currentUser);
  return <h1>Coucou2</h1>;
};

//function will be executing on server side
HomePage.getInitialProps = async ({ req }) => {
  //check if windows is executed server side because HTTP URL request is different from server than client
  if (typeof window === "undefined") {
    const { data } = await axios.get(
      // url schema to access from kubernete namespace: http://SERVICE_NAME.NAMESPACE.svc.cluster.local/URL_SERVICE
      "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser", //url from kubernete namespace to access nginx-ingress service
      {
        /* headers: {
          Host: "ticketing.dev", //telling to nginx-ingress that we will use ticketing.Dev domain
        }, */
        headers: req.headers,
      }
    );
    return data;
    //we are server side
  } else {
    //we are browser side
    const { data } = await axios.get("/api/users/currentuser"); //basic url from browser
    return data;
  }
  return {};
};

export default HomePage;
