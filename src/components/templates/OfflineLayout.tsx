import React, { FC, HTMLAttributes } from "react";


type LayoutProps = HTMLAttributes<HTMLDivElement> & {
  containerClassName?: string
};

const OfflineLayout: FC<LayoutProps> = ({
  children,
  className = 'flex flex-col gap-4 bg-white rounded-md pt-8 p-4 dark:bg-gray-700'
}) => {

  return (<div className='flex h-screen w-full flex-row items-center justify-center bg-primary-900 p-4'>
    <div className='h-screen w-auto grow'></div>
    <div className='flex h-screen w-[776px] items-center justify-center'>
      <div className={className}>
        {children}
      </div>
    </div>
  </div>);

};

export default OfflineLayout;