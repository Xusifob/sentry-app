import { useState } from "react";
import Entity from "@/schemas/entity";


const useArrayState = <TItemType extends Entity>(initialState = []) => {

  const [data, setData] = useState<TItemType[]>(initialState);

  const removeItem = (item : TItemType) => {
    setData((prevState) => prevState.filter((value) => value.id !== item.id));
  };

  return [
    data,
    {
      setData,
      removeItem
    }
  ];

};

export default useArrayState;