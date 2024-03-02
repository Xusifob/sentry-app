import { useState } from "react";


type EFFECTIVE_TYPE = "2g" | "3g" | "4g" | "5g" | "unknown"

type useNetworkStatusReturnType = {
    online: boolean,
    effectiveType: EFFECTIVE_TYPE
}

const useNetworkStatus = () : useNetworkStatusReturnType => {

  const [online,setOnline] = useState(navigator.onLine);
  const effectiveType = (navigator as Navigator).connection.effectiveType ?? "unknown";

  window.addEventListener('online', () => {
    setOnline(true);
  });

  window.addEventListener('offline', () => {
    setOnline(false);
  });

  return {
    online,
    effectiveType
  };

};

export default useNetworkStatus;