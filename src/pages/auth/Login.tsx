import React, { FC, useCallback } from 'react';

import LoginTemplate, { LoginPageSubmitType } from '@/components/templates/pages/Login';
import useLogin from "@/hooks/auth/useLogin";
import { saveMe } from "@/utils/getMe";
import useGetMeMutate from "@/hooks/auth/useGetMeMutate";
import queryClient, { persistQueryClient } from "@/react-query";
import { useNavigate } from "react-router-dom";

const Login: FC = () => {

  const navigate = useNavigate();

  const { doGet: getMe, isLoading: isMeLoading } = useGetMeMutate();

  const { isLoading, isSuccess, error, login } = useLogin();
  const onSubmit = useCallback(async (data: LoginPageSubmitType) => {

    try {
      await login(data);

      await persistQueryClient.clearCache(queryClient);

      const me = await getMe();
      saveMe(me.data);
      navigate('/errors');
    } catch (e) {
    // Do nothing
    }


  },[navigate,login, getMe]);


  return (<LoginTemplate
    saving={isLoading || isMeLoading}
    error={error?.body?.message}
    success={isSuccess}
    onSubmit={onSubmit}
  />);


};

export default Login;