"use client";

import React from "react";
import { SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "./AppSideBar";
import Header from "./Header";
import { Provider } from "react-redux";
import { store } from "@/store";
import { Toaster } from "@/components/ui/sonner";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <Provider store={store}>
        <AppSidebar />
        <main className="w-full">
          <Header />
          {children}
        </main>
        <Toaster />
      </Provider>
    </SidebarProvider>
  );
};

export default RootLayout;
