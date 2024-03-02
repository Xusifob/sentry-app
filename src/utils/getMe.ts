import { Me } from "@/schemas/User";

export const saveMe = (me: Me): void => {
  localStorage.setItem('me', JSON.stringify(me));
};

const getMe = (): Me|undefined => {
  const user = localStorage.getItem('me') as string | undefined;
  return user ? JSON.parse(user) : undefined;
};

export default getMe;