import React, { FC, PropsWithChildren, useEffect, useMemo, useState } from "react";
import { getIconByName } from "@/components/atoms/Icon";
import runOneSignal from "@/utils/oneSignal";

const MAX_HEIGHT = 50;

const App: FC<PropsWithChildren> = ({ children }) => {

  const [scrolling, setScrolling] = useState(false);
  const [touchYStart, setTouchYStart] = useState(0);
  const [touchY, setTouchY] = useState(0);

  const top = useMemo(() => Math.max(0, Math.min((touchY - touchYStart) - 300, MAX_HEIGHT)), [touchY, touchYStart]);
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchYStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {

    const element = e.target as HTMLElement;

    if (scrolling) {
      return;
    }

    const mainContent = element.closest('#main-content');

    if (mainContent) {
      if (mainContent.scrollTop > 0) {
        setScrolling(true);
        return;
      }

    }
    const currentTouchY = e.touches[0].clientY;
    setTouchY(currentTouchY);
  };

  const handleTouchEnd = () => {
    if (top > 30) {
      // @ts-ignore
      document.location.reload(true);
    }
    setTouchY(0);
    setScrolling(false);
    setTouchYStart(0);
  };

  useEffect(() => {
    runOneSignal();
  }, []);

  return (<div>
    {getIconByName('loading', {
      className: 'relative flex w-full justify-center items-center text-xl text-primary-500',
      style: {
        transform: `rotate(${top * 5}deg)`,
        height: `${top / 2}px`,
        top: `${MAX_HEIGHT - (top - 20)}px`
      }
    })
    }
    <div className='relative'
      style={{ top: `${top}px` }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </div>
  </div>);
};

export default App;