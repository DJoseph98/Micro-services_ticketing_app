//overload default page component fonctionnement

import 'bootstrap/dist/css/bootstrap.css';

export default ({Component, pageProps}) => {
    return <Component {...pageProps}/>
}; 