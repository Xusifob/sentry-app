import { useMutation } from "@tanstack/react-query";
import { POST, ResponseError } from "@/utils/http";
import { RegisterPageSubmitType } from "@/components/templates/pages/Register/RegisterTeacher";
import Item from "@/schemas/Item";
import { RegisterMe } from "@/schemas/User";



const useRegister = () => {
  const {
    mutateAsync: register,
    ...rest
  } = useMutation<Item<RegisterMe>, ResponseError, RegisterPageSubmitType>({
    mutationKey: ["register"],
    mutationFn: async (attributes: RegisterPageSubmitType) => {

      const data = {
        data: {
          attributes: attributes
        }
      };

      return POST<Item<RegisterMe>>('register', data);
    }
  });

  return {
    register,
    ...rest
  };

};

export default useRegister;