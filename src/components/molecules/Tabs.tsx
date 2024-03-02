import React, { FC, ReactNode, useMemo, useState } from "react";
import cls from "classnames";


export type Tab = {
    title: string,
    active?: boolean;
    component?: ReactNode;
    onClick?: () => void;
}

type TabsProps = {
    tabs: Tab[],
    className?: string
}

const Tabs: FC<TabsProps> = ({ tabs, className }) => {

  const initialActive = tabs.findIndex((tab) => tab.active);

  const [active, setActive] = useState<number>(initialActive === -1 ? 0 : initialActive);

  const component = useMemo(() => tabs?.[active]?.component,[active,tabs]);

  return (
    <div className='flex flex-col' >
      <div className={cls("overflow-auto max-w-full flex flex-row gap-2 py-4", className)}>
        {tabs.map((tab, index) => (
          <div key={index} className='w-full sm:w-auto'>
            <button onClick={() => {
              setActive(index);
              tab.onClick && tab.onClick();
            }}
            className={cls(
              'w-full py-2 px-10 rounded-md text-center',
              active === index ? 'dark:bg-primary-900 dark:text-primary-50 bg-primary-700 text-white' :
                'dark:bg-primary-700 dark:text-primary-300 border-primary-500 border bg-white text-primary-700'
            )}
            >{tab.title}</button>
          </div>
        ))}
      </div>
      {component && (<div>
        {component}
      </div>)}
    </div>
  );
};

export default Tabs;