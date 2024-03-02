import useGetMeMutate from "@/hooks/auth/useGetMeMutate";
import { useEffect, useState } from "react";
import getMe, { saveMe } from "@/utils/getMe";
import { Me } from "@/schemas/User";


const useStoredMe = () : Me|undefined => {

  const item = getMe();

  const [me,setMe] = useState<Me|undefined>(item);

  const { data,doGet, isLoading } = useGetMeMutate();

  useEffect(() => {

    if(me || isLoading || data) {
      return;
    }

    doGet().then((data) => {
      setMe(data.data);
      saveMe(data.data);
    });

  }, [doGet,data,isLoading,me]);

  if(!item) {
    return undefined;
  }

  return me;

};

export default useStoredMe;