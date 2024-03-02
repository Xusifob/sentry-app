import React from 'react';
import { useTranslation } from "react-i18next";
import Alert from "@/components/atoms/Alert";
import { useCallback, useState } from "react";
import Button from "@/components/atoms/Button";
import useOneSignal from "@/hooks/auth/useOneSignal";
import useToast from "@/hooks/ui/useToast";

const OneSignalBanner = () => {

  const { addToast } = useToast();

  const [isVisible, setIsVisible] = useState(true);


  const { enabled, enable, isEnabling } = useOneSignal();

  const { t } = useTranslation("home", {
    keyPrefix: "one_signal_banner"
  });


  const onClick = useCallback(async () => {

    try {
      await enable();
      addToast('success', t('success'));
    } catch (e) {
      console.log(e);

      addToast('error', t('error'));
    }
  }, [enable, t, addToast]);


  if (enabled || null === enabled || !isVisible) {
    return null;
  }

  return (<Alert
    color='success'
    onDismiss={() => setIsVisible(false)}
    className='bg-white dark:bg-gray-700'
    title={t('title') as string}
    content={t('content') as string}
    actions={<Button saving={isEnabling}

      icon='notification'
      onClick={onClick}
      color='success'>{t('accept_button')}</Button>}
  />);

};

export default OneSignalBanner;