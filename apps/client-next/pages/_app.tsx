import { AppProps } from 'next/app';
import Head from 'next/head';

import './styles.css';
import 'tailwindcss/tailwind.css';


function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title >Welcome to client-next!</title>
        
      </Head>
      <div className="app">
          
          <h1 className="text-xl font-medium text-red-400">Welcome to client-next!</h1>
        
        
      </div>
    </>
  );
}

export default CustomApp;
