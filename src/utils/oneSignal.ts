import OneSignal from 'react-onesignal';
import { getEnv } from "@/utils/importMeta";

export default async function runOneSignal() {
  await OneSignal.init({
    appId: getEnv('VITE_ONESIGNAL_APP_ID'),
    allowLocalhostAsSecureOrigin: true,
    autoResubscribe: true,
    welcomeNotification: {
      disable: true
    }
  });
}