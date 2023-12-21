"use client"
import { LOGIN_ROUTE, DASHBOARD_ROUTE, SIGNUP_ROUTE, FAVOURITES_ROUTE } from "@/constants";
import { AuthContext } from "@/services/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
const GUEST_ROUTES = [LOGIN_ROUTE,SIGNUP_ROUTE];

function Home() {
  const {user} = AuthContext();
  const userInfo = user?.user || null;
  const router = useRouter();
  const currentRoute = window.location.pathname;

  useEffect(()=>{
      if(!userInfo && !GUEST_ROUTES.includes(currentRoute)){
          router.push(LOGIN_ROUTE)
      }

      if(userInfo && GUEST_ROUTES.includes(currentRoute)){
          router.push(DASHBOARD_ROUTE);
      }

      if(userInfo && !GUEST_ROUTES.includes(currentRoute)){
          router.push(DASHBOARD_ROUTE);
      }
  },[]);
  return (
    <div className=" h-screen w-screen flex justify-center items-center text-3xl font-bold">Welcome</div>
  )
}

export default Home