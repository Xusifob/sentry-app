import cls from "classnames";
import React, { FC } from "react";
import Toast from "@/components/atoms/Toast";
import useToast from "@/hooks/ui/useToast";


const Toasts: FC = () => {

  const { toasts,onDismiss } = useToast(true);

  return (<div className={cls('flex flex-col fixed bottom-12 left-4 right-4 z-30')}>
    {toasts.map(({ key,dismissible, ...toast }) => (
      <Toast
        key={key}
        className={'bg-white dark:bg-gray-700'}
        onDismiss={dismissible ? () => onDismiss(key) : undefined}
        {...toast}
      />
    ))}
  </div>);

};

export default Toasts;
