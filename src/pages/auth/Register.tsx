import React, { FC } from 'react';

import RegisterTemplate, { RegisterPageSubmitType } from '@/components/templates/pages/Register/Register';
import useRegister from "@/hooks/auth/useRegister";
import useLogin from "@/hooks/auth/useLogin";
import { useNavigate } from "react-router-dom";


const Register: FC = () => {

  const navigate = useNavigate();
  const { isLoading, isSuccess, error, register } = useRegister();
  const { login, isLoading: isLogin } = useLogin();

  const onSubmit = async (data: RegisterPageSubmitType) => {

    await register({
      ...data,
    });

    await login({
      email: data.email,
      password: data.password
    });

    navigate('/errors');

  };


  return (<RegisterTemplate
    responseError={error}
    saving={isLoading || isLogin}
    success={isSuccess}
    onSubmit={onSubmit}
  />);


};

export default Register;