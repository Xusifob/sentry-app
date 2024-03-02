import SplashScreen from "@/pages/SplashScreen";
import React from "react";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import GoogleAuthCallback from "@/pages/auth/GoogleAuthCallback";
import PrivacyPolicy from "@/pages/auth/PrivacyPolicy";
import Errors from "@/pages/errors/Errors";


const getRoutes = () => {

  return [
    {
      path: "/",
      element: (<SplashScreen />)
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/errors",
      element: <Errors />,
    },
    {
      path: "/privacy",
      element: <PrivacyPolicy />,
    },
    {
      path: "/oauth2/google/callback",
      element: <GoogleAuthCallback />,
    },
    {
      path: "/register",
      element: <Register />
    },
  ];

};

export default getRoutes;