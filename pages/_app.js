import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { ClerkProvider } from '@clerk/nextjs'
import '../styles/globals.css';
import  Layout  from '../components/Layout';
import  {StateContext}  from '../context/StateContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from "aos";
import "aos/dist/aos.css";
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    AOS.init({
      easing: 'ease-out-quad',
      duration: 1000,
    });
  }, [])
  return (
    <ClerkProvider {...pageProps}>
    <StateContext>
      <Layout>
           <Toaster/>
         <Component {...pageProps} />
      </Layout>
     </StateContext> 
     </ClerkProvider> 
  )
}

export default MyApp