import React from 'react';
import Head from 'next/head';

import Navbar from './Navbar';
import { useUser } from '@clerk/nextjs';
import Layout1 from "./admin/_components/Layout1"
import Loading from "./Loading"

const Layout = ({ children }) => {
  const {user,isLoaded} = useUser()
  console.log(isLoaded);
  if (process.env.NEXT_PUBLIC_EMAIL === user?.primaryEmailAddress?.emailAddress ) {    
      return(
        <div>
            <Layout1/>
        </div>
      )
  }else{
      if (isLoaded) {
        return (
          <>
            <div>
              <div className="layout">
              <Head>
                <title>Headphone Store</title>
              </Head>
              <header>
                <Navbar />
              </header>
              <main className="main-container">
                {children}
              </main>
              <footer>
              </footer>
            </div>        
            </div>
          </>
        )
      }
      else{
        return(
          <Loading />
        ) 
      }
  }
}

export default Layout