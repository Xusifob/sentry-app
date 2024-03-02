import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { QueryClientProvider } from '@tanstack/react-query';

import queryClient from './react-query';

import '@/utils/i18n';

import Toasts from "@/components/molecules/Toasts";
import App from "@/pages/App";
import getAuthRoutes from "@/routes/auth";
import SplashScreen from "@/components/templates/SplashScreen";


import * as Sentry from "@sentry/react";
import { getEnv } from "@/utils/importMeta";

Sentry.init({
  dsn: getEnv('VITE_SENTRY_DSN'),
  integrations: [
    new Sentry.BrowserTracing({
      // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: [/^https:\/\/app\.wordgenius\.net/],
    }),
    new Sentry.Replay({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Session Replay
  // replaysSessionSampleRate: 0.1,
  // This sets the sample rate at 10%. You may want to change it to 100%
  // while in development and then sample at a lower rate in production.
  // replaysOnErrorSampleRate: 1.0,
  // If you're not already sampling the entire session, change the sample
  // rate to 100% when sampling sessions where errors occur.
});



const router = createBrowserRouter([
  ...getAuthRoutes(),
],
);



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<SplashScreen />}>
        <RouterProvider router={router} />
      </Suspense>
      <Toasts />
    </QueryClientProvider>
  </App>
);
