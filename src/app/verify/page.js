"use client";
import Discordpage from "../components/Discordpage.jsx";
import { useSession } from "next-auth/react";
import Connectwalletpage from "../components/Connectwalletpage";
import { useState } from "react";
import Loadingpage from "@/app/components/Loadingpage";
import Errorpage from "@/app/components/Errorpage";

export default function Verify({ params }) {
  let user;
  if (typeof window !== 'undefined') {
    user = JSON.parse(window.sessionStorage.getItem('data'))
  }
   const token = params.sessionToken;
  const [IsLoading, setIsLoading] = useState(true);
  const [sessionValidity, setSessionValidity] = useState(false);

  setTimeout(() => {
    setIsLoading(false);
  }, 5000);

  


  if (IsLoading) {
    return <Loadingpage loadingText="Loading, please wait.." />;
  } else {
      if (user) {

        const requestProcess = async () => {
          const response = await fetch(`http://localhost:8081/sessions/${user.id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
        
          const data = await response.json();
        
         

        
          if (data.expired === false) {
            

            if (typeof window !== 'undefined') {
              const sessionToken = data.token;
              user["sessionToken"] = `${sessionToken}`;
              window.sessionStorage.setItem('data', JSON.stringify(user));
              setSessionValidity(true);
            }

          } else if (data.expired === true) {
            setSessionValidity(false);
          }
        };
        
        requestProcess();
        

       if (sessionValidity === true) {
        return (
          <Connectwalletpage/>
         )
       } else {
          return (<Errorpage errorText="No session found please try again later" />)
        }
      }
        return (
          <>
            <Discordpage />
          </>
        );

  }
}
