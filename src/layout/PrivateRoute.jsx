"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";

export default function PrivateRoute({ children }) {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const { state } = useContext(UserContext);
  const [user, setUser] = useState(undefined);


  // console.log("user pre", user)




  useEffect(() => {


    if (state?.user) {
      console.log("user inside login", state?.user)
      setCheckingAuth(false);

      if (!state?.user?.name) {

        console.log("user not login", state?.user?.name)
        router.replace("/login");
      }

    }







    // if (state?.user?.name) {
    //   setUser(state?.user)
    //   console.log("user from if logged in", user)
    //   setCheckingAuth(false);
    // }
    // // Simulate checking if user data is ready


    //   if (state?.user  && !state?.user?.name ) {
    //     console.log("user from ig not login", state?.user)
    //     router.replace("/login");
    //     setCheckingAuth(false);
    //   }


  }, [ state]);

  // Show loader while checking auth
  if (checkingAuth) {
    return (
      <div className="flex justify-center items-center h-72">
        <p className="text-lg">Checking authentication...</p>
      </div>
    );
  }

  // If user is logged in, render the protected page
  return <>{children}</>;
}
