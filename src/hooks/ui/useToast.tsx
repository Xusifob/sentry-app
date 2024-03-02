import { useCallback, useEffect, useState } from "react";
import { ColorType } from "@/components/atoms/Alert";


type ListenerType = (toasts: ToastType[]) => void;

let globalToasts: ToastType[] = [];
let listeners: ListenerType[] = [];

export type addToastType = (color: ColorType, message: string, countdown ?: number, dismissible ?: boolean) => void;

type ToastType = {
    color: ColorType,
    dismissible?: boolean,
    key: string,
    title: string,
}


const useToast = (
  shouldListen = false
): {
    toasts: ToastType[],
    addToast: addToastType,
    onDismiss: (key: string) => void
} => {

  const setToasts = useState<ToastType[]>(globalToasts)[1];

  const onDismiss = useCallback((key: string) => {

    const index: number = globalToasts.findIndex((elem) => elem.key === key);

    if (index === -1) {
      return;
    }

    globalToasts = globalToasts.slice(1);

    for (const listener of listeners) {
      listener(globalToasts);
    }


  }, []);


  useEffect(() => {
    if (shouldListen) {
      listeners.push(setToasts);
    }

    return () => {
      if (shouldListen) {
        listeners = listeners.filter(li => li !== setToasts);
      }
    };
  }, [setToasts, shouldListen]);


  const addToast: addToastType = useCallback((
    color,
    message,
    countdown = 5000,
    dismissible = false
  ) => {

    const toast: ToastType = {
      color,
      title: message,
      dismissible,
      key: Math.random().toString(),
    };

    if (countdown) {
      setTimeout(() => {
        onDismiss(toast.key);
      }, countdown);
    }

    globalToasts = [...globalToasts, toast];

    for (const listener of listeners) {
      listener(globalToasts);
    }
  },
  [onDismiss]
  );


  return {
    toasts: globalToasts,
    addToast,
    onDismiss
  };

};

export default useToast;
