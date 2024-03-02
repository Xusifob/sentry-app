import React from 'react';
import Tabs, { Tab } from "@/components/molecules/Tabs";
import ErrorList from "@/pages/errors/ErrorList";
import Layout from "@/components/templates/Layout";
import OneSignalBanner from "@/components/organisms/OneSignalBanner";

const Errors = () => {

  const tabs: Tab[] = [
    {
      active: true,
      component: <ErrorList archived={false} />,
      title: "Active"
    },
    {
      component: <ErrorList archived={true} />,
      title: "Archived"
    }
  ];

  return (
    <Layout title='List of errors' >

      <OneSignalBanner />
      <Tabs tabs={tabs} />
    </Layout>
  );

};

export default Errors;