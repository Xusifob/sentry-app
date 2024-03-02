import OneSignal from 'react-onesignal';
import { getEnv } from "@/utils/importMeta";

export default async function runOneSignal() {
  await OneSignal.init({
    appId: getEnv('VITE_ONESIGNAL_APP_ID'),
    safari_web_id: getEnv('VITE_ONESIGNAL_SAFARI_ID'),
    serviceWorkerPath: '/OneSignalSDKWorker.js',
    allowLocalhostAsSecureOrigin: true,
    autoResubscribe: true,
    notifyButton: {
      enable: true,
    },
    welcomeNotification: {
      disable: true
    }
  });
}