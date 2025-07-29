import RootLayout from "@/components/Layout/RootLayout";
import { ThemeProvider } from "@/context/theme/ThemeContext";
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://5be6d8eb2ea31babb28646f552acc8cb@o4509749098840064.ingest.de.sentry.io/4509749121646672',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

export default Sentry.wrap(function AppLayout() {
  return (
    <ThemeProvider>
      <RootLayout />
    </ThemeProvider>
  );
});