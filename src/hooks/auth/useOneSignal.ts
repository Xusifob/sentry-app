import { useCallback, useEffect, useState } from "react";
import OneSignal from "react-onesignal";
import useUpdate from "@/hooks/base/useUpdate";

const useOneSignal = () => {

  const [enabled, setEnabled] = useState<null|boolean>();

  const { update: save } = useUpdate('one_signal/devices');

  const [isEnabling, setIsEnabling] = useState(false);

  useEffect(() => {
    OneSignal.isPushNotificationsEnabled().then((result) => {
      setEnabled(result);
    });
  }, []);

  const enable = useCallback(async () => {

    setIsEnabling(true);

    await OneSignal.showNativePrompt();

    const token = await OneSignal.getUserId();

    const isEnabled = await OneSignal.isPushNotificationsEnabled();

    if (!token || !isEnabled) {
      setIsEnabling(false);
      throw new Error('errors.one_signal_token');

    }

    await save({
      token,
    });

    setEnabled(true);

    setIsEnabling(false);

  }, [save]);

  return {
    enable,
    enabled,
    isEnabling
  };

};

export default useOneSignal;