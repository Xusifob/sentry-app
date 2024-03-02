import React, { FC, useEffect } from 'react';
import useMe from "@/hooks/auth/useMe";
import { useNavigate } from "react-router-dom";
import { saveMe } from "@/utils/getMe";

import BaseSplashScreen from "@/components/templates/SplashScreen";

const SplashScreen: FC = () => {

  const navigate = useNavigate();
  const { error, data } = useMe({
    include: "languages,owner,currentLanguage"
  });


  useEffect(() => {
    if (error) {
      navigate('/login');
      return;
    }

    if (data) {
      saveMe(data.data);

      navigate("/errors");
      return;
    }


  }, [navigate, error, data]);


  return (<BaseSplashScreen />);
};

export default SplashScreen;