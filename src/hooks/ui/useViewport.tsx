import { useEffect, useState } from 'react';

type ViewPortValues = {
    width: number;
    height: number;
    xs: boolean;
    sm: boolean;
    md: boolean;
    lg: boolean;
    xl: boolean;
    lightMode: boolean;
}

const getViewPortValues = (width: number, height: number) : ViewPortValues => (
  {
    width,
    height,
    xs: width < 640,
    sm: width >= 640 && width < 768,
    md: width >= 768 && width < 1024,
    lg: width >= 1024 && width < 1280,
    xl: width >= 1280,
    lightMode : !window?.matchMedia('(prefers-color-scheme: dark)')?.matches,
  });

const useViewport = () : ViewPortValues => {
  const [viewport, setViewport] = useState(getViewPortValues(window.innerWidth, window.innerHeight));

  useEffect(() => {
    const handleResize = () => {
      setViewport(getViewPortValues(window.innerWidth, window.innerHeight));
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return viewport;
};

export default useViewport;