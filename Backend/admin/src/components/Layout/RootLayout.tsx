import React from "react";
import { SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "./AppSideBar";
import Header from "./Header";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <Header />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default RootLayout;
