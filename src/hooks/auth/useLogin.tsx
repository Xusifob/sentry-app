import { LoginPageSubmitType } from "@/components/templates/pages/Login";
import { useMutation } from "@tanstack/react-query";
import { POST, ResponseError } from "@/utils/http";


export type LoginType = {
    token: string
    refreshTokenExpiration: number
    refreshToken: string
}

export const getRefreshToken = (): string | undefined => {
  const token = localStorage.getItem('refresh_token');

  if (!token) {
    return;
  }

  const expiration_time = localStorage.getItem('refresh_token_expiration');

  const time = parseInt(expiration_time ?? "0");

  if (time < ((new Date()).getTime() / 1000)) {

    localStorage.removeItem('refresh_token_expiration');
    localStorage.removeItem('refresh_token');
    return;
  }

  return token;

};

export const saveTokens = (response: LoginType): void => {

  localStorage.setItem('token', response.token);
  localStorage.setItem('refresh_token', response.refreshToken);
  localStorage.setItem('refresh_token_expiration', response.refreshTokenExpiration.toString());

};

export const destroyTokens = (): void => {

  localStorage.removeItem('token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('refresh_token_expiration');
  localStorage.removeItem('me');
};


const useLogin = () => {

  const headers = new Headers();
  headers.append("Content-type", "application/json");

  const { mutateAsync: login, ...rest } = useMutation<LoginType, ResponseError, LoginPageSubmitType>({
    mutationKey: ["login"],
    mutationFn: async (props) => {
      const response = await POST<LoginType>('login', props, {
        headers,
        anonymous: true
      });

      saveTokens(response);

      return response;
    }
  });

  return {
    login,
    ...rest
  };

};

export default useLogin;