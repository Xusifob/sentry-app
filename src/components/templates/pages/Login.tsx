import React, { FC } from 'react';
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { useTranslation } from "react-i18next";


import { useForm } from "react-hook-form";
import Form from "@/components/atoms/Form";
import { Link } from "react-router-dom";
import Alert from "@/components/atoms/Alert";
import OfflineLayout from "@/components/templates/OfflineLayout";
import LoginWithGoogleButton from "@/components/molecules/LoginWithGoogleButton";
import Logo from "@/components/atoms/Logo";


type LoginPageProps = {
    onSubmit: (data: LoginPageSubmitType) => void;
    success?: boolean
    error?: string
    saving?: boolean
}

export type LoginPageSubmitType = {
    email: string,
    password: string
}


const Login: FC<LoginPageProps> = ({ onSubmit, saving, error, success }) => {

  const { t } = useTranslation('login');

  const { handleSubmit, register } = useForm<LoginPageSubmitType>();

  return (
    <OfflineLayout>

      <Logo />

      {error && <Alert color='error' title={error} />}
      {success && <Alert color='success' title={t('success.login') as string} />}

      <LoginWithGoogleButton />

      <Form onSubmit={handleSubmit(onSubmit)}>

        <Input
          type='email'
          {...register('email')}
          label={t('email') as string}
          placeholder={t('email') as string}
        />
        <Input
          type='password'
          {...register('password')}
          label={t('password') as string}
          placeholder={t('password') as string}
        />

        <div className='flex items-center justify-between'>
          <div className='flex flex-col gap-2'>
            {false && (<Link className='text-sm text-primary-500' to='#'>{t('password_forgotten')}</Link>)}
            <Link className='text-sm text-primary-500' to='/register'>{t('register')}</Link>
          </div>
          <Button saving={saving} type='submit'>{t('login')}</Button>
        </div>
      </Form>
    </OfflineLayout>
  );
};

export default Login;