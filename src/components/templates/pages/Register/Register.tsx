import React, { FC, useEffect } from 'react';
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { useTranslation } from "react-i18next";
import { attachErrorsToFields } from "@/utils/http";

import { useForm } from "react-hook-form";
import Form from "@/components/atoms/Form";
import { ResponseError } from "@/utils/http";
import { Link } from "react-router-dom";
import OfflineLayout from "@/components/templates/OfflineLayout";
import Alert from "@/components/atoms/Alert";
import LoginWithGoogleButton from "@/components/molecules/LoginWithGoogleButton";
import Logo from "@/components/atoms/Logo";


type RegisterPageProps = {
    onSubmit: (data: RegisterPageSubmitType) => void;
    saving?: boolean,
    success?: boolean
    responseError?: ResponseError | null
}

export type RegisterPageSubmitType = {
    email: string,
    password: string,
    repeatPassword: string,
    givenName: string,
    familyName: string
}


const Register: FC<RegisterPageProps> = ({ onSubmit, saving, success, responseError }) => {

  const { t } = useTranslation('login');

  const { handleSubmit, formState: { errors }, setError, register } = useForm<RegisterPageSubmitType>();

  useEffect(() => {
    attachErrorsToFields<RegisterPageSubmitType>(setError, responseError);
  }, [responseError,setError]);

  return (
    <OfflineLayout>
      <Logo />
      <LoginWithGoogleButton />

      <Form onSubmit={handleSubmit(onSubmit)}>

        {success && <Alert color='success' title={t('success.register') as string} />}

        <Input
          type='email'
          {...register('email')}
          errors={errors}
          label={t('email') as string}
          placeholder={t('email') as string}
        />
        <Input
          type='text'
          {...register('givenName')}
          errors={errors}
          label={t('givenName') as string}
          placeholder={t('givenName') as string}
        />
        <Input
          type='text'
          {...register('familyName')}
          errors={errors}
          label={t('familyName') as string}
          placeholder={t('familyName') as string}
        />
        <Input
          type='password'
          {...register('password')}
          errors={errors}
          label={t('password') as string}
          placeholder={t('password') as string}
        />
        <Input
          type='password'
          {...register('repeatPassword')}
          errors={errors}
          label={t('repeatPassword') as string}
          placeholder={t('repeatPassword') as string}
        />

        <div className='flex items-center justify-between'>
          <div className='flex flex-col gap-2' >
            <Link className='text-sm text-primary-500' to='/login'>{t('login')}</Link>
          </div>
          <Button saving={saving} type='submit'>{t('register')}</Button>
        </div>
      </Form>
    </OfflineLayout>
  );
};

export default Register;