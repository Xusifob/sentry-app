import React, { FC, PropsWithChildren,useEffect } from "react";
import runOneSignal from "@/utils/oneSignal";


const App: FC<PropsWithChildren> = ({ children }) => {

  useEffect(() => {
    runOneSignal();
  }, []);

  return (<div>
    {children}
  </div>);
};

export default App;