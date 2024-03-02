import { baseDomain } from "@/utils/http";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";


const LoginWithGoogleButton : FC = () => {

  const { t } = useTranslation('login');

  return null;

  return (<div className='mt-8 px-4'>
    <button
      onClick={() => {
        window.location.href = `${baseDomain}/oauth2/google/redirect`;
      }}

      className='group h-12 w-full rounded-md border-2 border-gray-300 px-6 transition duration-300 dark:border-gray-500'>
      <div className='relative flex items-center justify-center gap-4 space-x-4'>
        <img src='https://www.svgrepo.com/show/475656/google-color.svg'
          className='absolute left-0 w-5' alt='google logo' />
        <span
          className='block w-max text-sm font-semibold text-gray-700 transition duration-300 dark:text-gray-100 sm:text-base'>
          {t('login_with_google')}
        </span>
      </div>
    </button>
    <div className='relative mt-4 flex w-full grow justify-center'>
      <hr className='absolute inset-x-4 top-[50%] z-0 border-gray-100 dark:border-gray-500' />
      <span className='z-10 bg-white px-4 text-sm text-gray-800 dark:bg-gray-700 dark:text-white'>{t('or')}</span>
    </div>
  </div>);

};

export default LoginWithGoogleButton;