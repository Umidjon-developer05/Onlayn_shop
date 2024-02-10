import { SignUp } from "@clerk/nextjs";
import React from 'react';

export default function Page() {
  return (
    <div style={{marginTop:"50px",display:"flex",justifyContent:"center"}}>
      <SignUp />
  </div>
  );
}