import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { SquidContextProvider } from '@squidcloud/react';
import './index.css';
import { ClerkProvider } from '@clerk/clerk-react';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <SquidContextProvider
      options={{
        appId: import.meta.env.VITE_SQUID_APP_ID,
        region: import.meta.env.VITE_SQUID_REGION,
        environmentId: import.meta.env.VITE_SQUID_ENVIRONMENT_ID,
        //squidDeveloperId: import.meta.env.VITE_SQUID_DEVELOPER_ID,
      }}
    >
      <App />
    </SquidContextProvider>
  </ClerkProvider>
);
