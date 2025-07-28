import RootLayout from "@/components/Layout/RootLayout";
import { ThemeProvider } from "@/context/theme/ThemeContext";

export default function AppLayout() {
  return (
    <ThemeProvider>
      <RootLayout />
    </ThemeProvider>
  );
}
