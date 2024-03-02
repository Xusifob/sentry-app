import React, { FC, useCallback, useEffect } from 'react';
import Layout from "@/components/templates/Layout";
import { FieldValues, useForm } from "react-hook-form";
import Button from "@/components/atoms/Button";
import TagsInput from "@/components/molecules/TagsInput";
import useUpdate from "@/hooks/base/useUpdate";
import useGet from "@/hooks/base/useGet";
import { Me } from "@/schemas/User";
import Item from "@/schemas/Item";
import { useNavigate } from "react-router-dom";


type SettingFormType = FieldValues & {
  projects : string[]
}

type UserUpdateType = {
  id : string
  projects: string[]
}

const Settings : FC = () => {

  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem('refresh_token_expiration');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('token');

    navigate('/auth/login');

  };

  const { handleSubmit,control,reset } = useForm<SettingFormType>();

  const { update,isLoading } = useUpdate<UserUpdateType>('users');

  const { data : me } = useGet<Item<Me>>('users','me');

  useEffect(() => {

    if(!me) {
      return;
    }

    reset({
      projects: me?.data.attributes?.projects.map((item) => item.toString())
    });

  }, [reset,me]);

  const onSubmit = useCallback((data : SettingFormType) => {

    if(!me) {
      return;
    }

    update({
      id : me.data.attributes._id,
      ...data
    });

  },[me,update]);

  return (<Layout title='Settings' >
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 py-4' >
      <TagsInput
        label='Ids of your projects,'
        control={control}
        name='projects' />

      <Button saving={isLoading} >Submit</Button>
    </form>

    <p className='w-full p-4 text-center' >Or</p>

    <Button
      className='w-full'
      onClick={logOut}
      color='error'
      outline={true} >Log out</Button>

  </Layout>);

};

export default Settings;