import RootLayout from "@/components/Layout/RootLayout";
import { ThemeProvider } from "@/context/theme/ThemeContext";
import { router } from "expo-router";

export default function AppLayout() {

  return (
    <ThemeProvider>
      <RootLayout />
    </ThemeProvider>
  );
}
