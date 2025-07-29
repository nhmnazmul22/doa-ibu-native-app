import RootLayout from "@/components/Layout/RootLayout";
import { ThemeProvider } from "@/context/theme/ThemeContext";
import { useEffect } from "react";
import * as Sentry from "sentry-expo";

Sentry.init({
  dsn: "https://5be6d8eb2ea31babb28646f552acc8cb@o4509749098840064.ingest.de.sentry.io/4509749121646672",
  enableInExpoDevelopment: true,
  debug: true, // turn off in production
});

export default function AppLayout() {
  return (
    <ThemeProvider>
      <RootLayout />
    </ThemeProvider>
  );
}
