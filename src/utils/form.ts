import { TFunction } from "i18next";


export const required = (t : TFunction) : string => {
  return t('form.required',{ ns : 'form' }) as string;
};