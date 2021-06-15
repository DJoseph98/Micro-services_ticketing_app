import axios from "axios";

export const buildClient = ({ req }) => {
  //check if windows is executed server side because HTTP URL request is different from server than client

  if (typeof window === "undefined") {
    //we are server side
    return axios.create({
      // url schema to access from kubernete namespace: http://SERVICE_NAME.NAMESPACE.svc.cluster.local/URL_SERVICE
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local", //url from kubernete namespace to access nginx-ingress service'
      headers: req.headers,
    });
  } else {
    //we are browser side
    return axios.create({
      baseUrl: "/",
    });
  }
};
