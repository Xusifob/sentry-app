import React, { FC } from 'react';
import OfflineLayout from "@/components/templates/OfflineLayout";
import Image from "@/components/atoms/Image";

import logo from '@/components/templates/pages/logo.svg';
import logo_white from '@/components/templates/pages/logo_white.svg';

const SplashScreen: FC = () => {

  return (
    <OfflineLayout>
      <div className='flex flex-row items-center gap-4'>
        <Image src={logo} className='animate-pulse dark:hidden'
          alt='Logo' />
        <Image src={logo_white} className='hidden animate-pulse dark:block'
          alt='Logo' />
      </div>
    </OfflineLayout>
  );
};

export default SplashScreen;